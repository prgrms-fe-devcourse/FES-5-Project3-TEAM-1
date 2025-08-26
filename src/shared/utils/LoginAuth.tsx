import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../libs/supabase';
import { useModal } from './ModalProvider';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const modal = useModal();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setIsLoggedIn(false);
        return;
      } else {
        setIsLoggedIn(true);

        // 최초 가입 여부 체크
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .eq('welcome_shown', true)
          .maybeSingle();

        if (error) {
          console.error(error);
          return;
        }

        if (profile?.welcome_shown !== true) {
          modal.openModal('welcome');
          const { error } = await supabase
            .from('users')
            .update({ welcome_shown: true })
            .eq('id', session.user.id);
          if (error) {
            console.error('데이터 업데이트 중 에러 : ', error);
          }
        }
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
