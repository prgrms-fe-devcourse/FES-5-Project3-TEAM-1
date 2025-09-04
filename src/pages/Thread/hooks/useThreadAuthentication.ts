import { useThreadStore } from '@/features/thread/utils/store';
import { generateSimpleFingerprint } from '@/shared/utils/fingerPrint';
import { toastUtils } from '@/shared/utils/toastUtils';
import {
  getBrowserTokenFromSession,
  setTokenToSession,
} from '@/shared/utils/token';
import { useEffect, useState } from 'react';

export const useThreadAuthentication = (threadId?: string) => {
  const [token, setToken] = useState<string>('');
  const [notFound, setNotFound] = useState<boolean>(false);
  // 쓰레드 스토어
  const isLoading = useThreadStore((state) => state.isLoading);
  const isAuthenticated = useThreadStore((state) => state.isAuthenticated);
  const thread = useThreadStore((state) => state.thread);
  const isPasswordRequired = useThreadStore(
    (state) => state.isPasswordRequired,
  );
  const fetchThread = useThreadStore((state) => state.fetchThread);
  const validatePassword = useThreadStore((state) => state.validatePassword);

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
    if (!threadId) return;
    try {
      // 토큰이 없다면 발급
      const currentToken = getBrowserTokenFromSession();
      if (!currentToken) {
        genToken();
      }

      const isExisting = await fetchThread(threadId);

      if (!isExisting) {
        setNotFound(true);
      }
      // 쓰레드 정보 가져오기
    } catch (error) {
      if (error instanceof Error) {
        toastUtils.error(error.message);
      }
      setNotFound(true);
    }
  };

  // 비밀번호 검증
  const handleValidatePassword = async (
    inputPassword: string,
    threadId: string,
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
    notFound,
  };
};
