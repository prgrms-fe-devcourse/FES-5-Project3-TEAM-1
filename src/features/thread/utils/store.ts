import { create } from 'zustand';

import {
  getAuthenticatedThreadIdsFromSession,
  setAuthenticatedThreadIdsToSession,
} from '@/pages/Thread/utils/sessionUtil';
import { getThreadInfo, getThreadPassword } from '@/shared/api/thread';

import type { Thread, ThreadStore } from './type';

export const useThreadStore = create<ThreadStore>((set) => ({
  thread: null,
  isLoading: false,
  isAuthenticated: false,
  isPasswordRequired: false,
  fetchThread: async (threadId: string): Promise<Thread | null> => {
    set({ thread: null, isLoading: false });
    try {
      const threadInfo = await getThreadInfo(threadId);
      set({ thread: threadInfo });

      // 검증된 세션이 아니고 비밀번호가 필요한 세션이면?
      const authenticatedThreads = getAuthenticatedThreadIdsFromSession();
      if (!authenticatedThreads.includes(threadId) && threadInfo?.password) {
        set({ isPasswordRequired: true });
      }

      return threadInfo;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  validatePassword: async (
    threadId: string,
    inputPassword: string,
  ): Promise<boolean> => {
    try {
      const password = await getThreadPassword(threadId);
      if (password === inputPassword) {
        set({ isAuthenticated: true });

        // 세션 저장 로직
        const authenticatedThreads = getAuthenticatedThreadIdsFromSession();
        authenticatedThreads.push(threadId);
        setAuthenticatedThreadIdsToSession(authenticatedThreads);

        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return false;
    }
  },
  clearThread: () => set({ thread: null }),
}));
