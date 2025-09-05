import { localStorageUtil } from './localStorage';
import { sessionStorageUtil } from './sessionStorage';

const ANONIMO_TOKEN = 'anonimo_token';

// 토큰 get
export const getBrowserTokenFromSession = (): string | null => {
  return sessionStorageUtil.getSession<string>(ANONIMO_TOKEN);
};
// 토근 set
export const setTokenToSession = (token: string) => {
  sessionStorageUtil.setSession(ANONIMO_TOKEN, token);
};

// 토큰 get
export const getBrowserTokenFromLocalStorage = (): string | null => {
  return localStorageUtil.getLocal<string>(ANONIMO_TOKEN);
};
// 토근 set
export const setTokenToLocalStorage = (token: string) => {
  localStorageUtil.setLocal(ANONIMO_TOKEN, token);
};
