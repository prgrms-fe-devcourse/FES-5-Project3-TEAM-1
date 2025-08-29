import { getThreadInfo, getThreadPassword } from '@/shared/api/thread';
import { generateSimpleFingerprint } from '@/shared/utils/fingerPrint';
import { sessionStorageUtil } from '@/shared/utils/sessionStorage';
import { toastUtils } from '@/shared/utils/toastUtils';
import {
  getBrowserTokenFormSession,
  setTokenToSession,
} from '@/shared/utils/token';
import { useEffect, useState } from 'react';
import {
  getAuthenticatedThreadIdsFromSession,
  setAuthenticatedThreadIdsToSession,
} from '../utils/sessionUtil';

export const useThreadAuthentication = (threadId: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    checkThreadAccess();
  }, [threadId]);

  // 기존 토큰이 있으면 state에 설정
  useEffect(() => {
    const currentToken = getBrowserTokenFormSession();
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
    setIsLoading(true);
    try {
      // 토큰이 없다면 발급
      const currentToken = getBrowserTokenFormSession();
      if (!currentToken) {
        genToken();
      }

      // 세션에서 확인
      const authenticatedThreads = getAuthenticatedThreadIdsFromSession();

      // 이미 검증된 쓰레드라면 재검증 필요 없음
      if (authenticatedThreads.includes(threadId)) {
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
        setIsAuthenticated(true);
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
        const authenticatedThreads = getAuthenticatedThreadIdsFromSession();
        authenticatedThreads.push(threadId);
        setAuthenticatedThreadIdsToSession(authenticatedThreads);

        // 토큰이 없다면 발급
        const currentToken = getBrowserTokenFormSession();
        if (!currentToken) {
          genToken();
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
