import { sessionStorageUtil } from './sessionStorage';

const ANONIMO_TOKEN = 'anonimo_token';

// 토큰 get
export const getBrowserTokenFormSession = (): string | null => {
  return sessionStorageUtil.getSession<string>(ANONIMO_TOKEN);
};
// 토근 set
export const setTokenToSession = (token: string) => {
  sessionStorageUtil.setSession(ANONIMO_TOKEN, token);
};
