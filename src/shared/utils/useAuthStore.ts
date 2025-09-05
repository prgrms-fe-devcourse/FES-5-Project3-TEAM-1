import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  logout: () => void;
  isFirstLogin: boolean;
  firstLogin: () => void;
  isLoading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isFirstLogin: false,
  isLoading: true,
  isLoggedIn: false,

  logout: () => {
    set({ isLoggedIn: false, userId: null });
  },
  firstLogin: () => set({ isFirstLogin: false }),
}));
