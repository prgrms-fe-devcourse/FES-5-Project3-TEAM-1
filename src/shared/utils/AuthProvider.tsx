import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../libs/supabase';
import { toastUtils } from './toastUtils';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  logout: () => void;
  isFirstLogin: boolean;
  firstLogin: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  logout: () => {},
  isFirstLogin: false,
  firstLogin: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
            setIsFirstLogin(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
        setUserId(session?.user.id || null);

        if (_event === 'SIGNED_IN') {
          const hasShownToast = localStorage.getItem('loginToastShown');

          if (!hasShownToast) {
            toastUtils.success('로그인 성공!');
            localStorage.setItem('loginToastShown', 'true');
          }
        }

        if (_event === 'SIGNED_OUT') {
          localStorage.removeItem('loginToastShown');
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
  };

  const firstLogin = () => {
    setIsFirstLogin(false);
  };

  const value: AuthContextType = {
    userId,
    isLoggedIn,
    logout,
    isFirstLogin,
    firstLogin,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
