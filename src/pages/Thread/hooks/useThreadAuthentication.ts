import { useThreadStore } from '@/features/thread/utils/store';
import { generateSimpleFingerprint } from '@/shared/utils/fingerPrint';
import { toastUtils } from '@/shared/utils/toastUtils';
import {
  getBrowserTokenFromSession,
  setTokenToSession,
} from '@/shared/utils/token';
import { useEffect, useState } from 'react';

export const useThreadAuthentication = (threadId: string) => {
  const [token, setToken] = useState<string>('');
  // 쓰레드 스토어
  const isAuthenticated = useThreadStore((state) => state.isAuthenticated);
  const fetchThread = useThreadStore((state) => state.fetchThread);
  const isLoading = useThreadStore((state) => state.isLoading);
  const thread = useThreadStore((state) => state.thread);
  const validatePassword = useThreadStore((state) => state.validatePassword);
  const isPasswordRequired = useThreadStore(
    (state) => state.isPasswordRequired,
  );

  useEffect(() => {
    checkThreadAccess();
  }, [threadId]);

  // 기존 토큰이 있으면 state에 설정
  useEffect(() => {
    const currentToken = getBrowserTokenFromSession();
    if (!currentToken) {
      genToken();
    } else {
      setToken(currentToken);
    }
  }, []);

  const genToken = async () => {
    const newToken = await generateSimpleFingerprint();
    setTokenToSession(newToken);
    setToken(newToken);
  };

  const checkThreadAccess = async () => {
    try {
      // 토큰이 없다면 발급
      const currentToken = getBrowserTokenFromSession();
      if (!currentToken) {
        genToken();
      }

      await fetchThread(threadId);
      // 쓰레드 정보 가져오기
    } catch (error) {
      if (error instanceof Error) {
        toastUtils.error(error.message);
      }
    }
  };

  // 비밀번호 검증
  const handleValidatePassword = async (
    inputPassword: string,
  ): Promise<{ success: boolean; message: string }> => {
    const success = await validatePassword(threadId, inputPassword);
    return { success: success, message: success ? '인증 성공' : '인증 실패' };
  };

  return {
    token,
    thread,
    isLoading,
    isAuthenticated,
    isPasswordRequired,
    validatePassword: handleValidatePassword,
  };
};
