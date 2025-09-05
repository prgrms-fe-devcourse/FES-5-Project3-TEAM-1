import { localStorageUtil } from '@/shared/utils/localStorage';

const THREAD_KEY = 'authenticated_threads';

// authenticated 쓰레드 정보 get
export const getAuthenticatedThreadIdsFromLocalStorage = (): string[] => {
  return localStorageUtil.getLocal<string[]>(THREAD_KEY) ?? [];
};
// authenticated 쓰레드 정보 set
export const setAuthenticatedThreadIdsToLocalStorage = (
  authenticatedThreads: string[],
) => {
  localStorageUtil.setLocal(THREAD_KEY, authenticatedThreads);
};
