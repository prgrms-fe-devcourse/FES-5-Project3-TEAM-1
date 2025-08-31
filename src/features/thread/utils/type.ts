import type { Tables } from '@/shared/types';

export type Thread = Tables<'threads'>;

export interface ThreadStore {
  thread: Thread | null;
  isLoading: boolean;
  fetchThread: (threadId: string) => Promise<Thread | null>;
  isAuthenticated: boolean;
  isPasswordRequired: boolean;
  validatePassword: (
    threadId: string,
    inputPassword: string,
  ) => Promise<boolean>;
  clearThread: () => void;
}
