import { useEffect } from 'react';
import { useThemeStore } from './hooks/useThemeStore';
// import { useLocation } from 'react-router-dom';

const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  // const location = useLocation();

  useEffect(() => {
    // const isLanding = location.pathname === '/';

    // if (isLanding) document.documentElement.classList.remove('dark');
    // else {
    // }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeManager;
