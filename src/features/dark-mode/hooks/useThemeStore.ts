import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      //localStorage에 저장하기
      return {
        isDarkMode: !state.isDarkMode,
      };
    }),
  setDarkMode: (value) => {
    //localStorage에 저장하기
    set({ isDarkMode: value });
  },
}));
