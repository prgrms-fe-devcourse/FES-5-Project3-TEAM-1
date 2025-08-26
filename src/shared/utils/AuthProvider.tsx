import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../libs/supabase';
import { useModal } from './ModalProvider';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const modal = useModal();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          setIsLoggedIn(false);
          return;
        } else {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          // 최초 가입 여부 체크
          const { data: profile, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .eq('welcome_shown', false)
            .maybeSingle();

          if (error) {
            throw error;
          }

          if (profile) {
            modal.openModal('welcome');
            const { error } = await supabase
              .from('users')
              .update({ welcome_shown: true })
              .eq('id', session.user.id);
            if (error) {
              throw error;
            }
          }
        }
      } catch (error) {
        console.error('유저 데이터 처리 중 에러 : ', error);
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

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value: AuthContextType = {
    userId,
    isLoggedIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
