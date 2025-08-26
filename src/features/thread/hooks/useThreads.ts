import { getThreadInfo, getThreadPassword } from '@/shared/api/thread';
import { sessionStorageUtil } from '@/shared/utils/sessionStorage';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useEffect, useState } from 'react';

const THREAD_KEY = 'authenticated_threads';

export const useThreads = (threadId: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkThreadAccess();
  }, [threadId]);

  const checkThreadAccess = async () => {
    setIsLoading(true);
    try {
      // 세션에서 확인
      const authenticatedThreads =
        sessionStorageUtil.getSession<string[]>(THREAD_KEY);

      // 이미 검증된 쓰레드라면 재검증 필요 없음
      if (authenticatedThreads?.includes(threadId)) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // 쓰레드 정보 가져오기
      const res = await getThreadInfo(threadId);

      if (res.password) {
        setIsAuthenticated(false);
        setIsPasswordRequired(true);
      } else {
        setIsPasswordRequired(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toastUtils.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = async (
    inputPassword: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const password = await getThreadPassword(threadId);

      if (inputPassword === password) {
        setIsAuthenticated(true);

        // 세션에 저장
        const authenticatedThreads =
          sessionStorageUtil.getSession<string[]>(THREAD_KEY) || [];
        authenticatedThreads?.push(threadId);
        sessionStorageUtil.setSession(THREAD_KEY, authenticatedThreads);
      }

      return { success: true, message: '비밀번호 인증 성공' };
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return { success: false, message: '비밀번호 인증 실패' };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    isPasswordRequired,
    validatePassword,
  };
};
