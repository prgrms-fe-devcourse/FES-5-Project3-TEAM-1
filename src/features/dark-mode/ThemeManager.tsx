import { useEffect } from 'react';
import { useThemeStore } from './hooks/useThemeStore';

const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const setDarkMode = useThemeStore((state) => state.setDarkMode);

  useEffect(() => {
    // 초기값 세팅
    if (localStorage.getItem('theme-storage') === null) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setDarkMode(mediaQuery.matches);
    }
  }, [setDarkMode]);

  useEffect(() => {
    // isDarkMode 바뀔 때 DOM 업데이트
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeManager;
