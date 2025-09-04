import { useEffect } from 'react';
import { useThemeStore } from './hooks/useThemeStore';

const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeManager;
