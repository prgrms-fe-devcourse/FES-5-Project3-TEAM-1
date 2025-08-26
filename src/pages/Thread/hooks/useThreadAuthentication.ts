import { getThreadInfo, getThreadPassword } from '@/shared/api/thread';
import { generateSimpleFingerprint } from '@/shared/utils/fingerPrint';
import { sessionStorageUtil } from '@/shared/utils/sessionStorage';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useEffect, useState } from 'react';

const THREAD_KEY = 'authenticated_threads';
const ANONIMO_TOKEN = 'anonimo_token';

export const useThreadAuthentication = (threadId: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    checkThreadAccess();
  }, [threadId]);

  const genToken = async () => {
    // 토큰이 없다면 발급
    const token = sessionStorageUtil.getSession<string>(ANONIMO_TOKEN) || '';
    if (!token) {
      const newToken = await generateSimpleFingerprint();
      sessionStorageUtil.setSession(ANONIMO_TOKEN, newToken);
      setToken(newToken);
    } else {
      setToken(token);
    }
  };

  const checkThreadAccess = async () => {
    setIsLoading(true);
    try {
      // 토큰 생성
      genToken();

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

      if (res?.password) {
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

        // 토큰이 없다면 발급
        if (sessionStorageUtil.getSession<string>(ANONIMO_TOKEN) || '') {
          sessionStorageUtil.setSession(
            ANONIMO_TOKEN,
            generateSimpleFingerprint(),
          );
        }

        return { success: true, message: '비밀번호 인증 성공' };
      } else {
        return { success: false, message: '비밀번호 인증 실패' };
      }
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
    token,
  };
};
