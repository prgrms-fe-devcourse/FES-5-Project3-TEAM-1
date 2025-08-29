import { sessionStorageUtil } from '@/shared/utils/sessionStorage';

const THREAD_KEY = 'authenticated_threads';

// authenticated 쓰레드 정보 get
export const getAuthenticatedThreadIdsFromSession = (): string[] => {
  return sessionStorageUtil.getSession<string[]>(THREAD_KEY) ?? [];
};
// authenticated 쓰레드 정보 set
export const setAuthenticatedThreadIdsToSession = (
  authenticatedThreads: string[],
) => {
  sessionStorageUtil.setSession(THREAD_KEY, authenticatedThreads);
};
