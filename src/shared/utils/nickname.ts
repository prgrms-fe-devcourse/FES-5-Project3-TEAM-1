import { sessionStorageUtil } from './sessionStorage';

const ANONIMO_NICKNAME_KEY = 'anonimo_nickname_key';

// 세션 스토리지에서 닉네임 가져오기
export const saveNickname = (nickname: string) =>
  sessionStorageUtil.setSession(ANONIMO_NICKNAME_KEY, nickname);

// 세션 스토리지에서 닉네임
export const getNicknameFromSession = (): string | null =>
  sessionStorageUtil.getSession(ANONIMO_NICKNAME_KEY);

// 세션 스토리지에서 닉네임
export const removeNickname = (): void =>
  sessionStorageUtil.removeSession(ANONIMO_NICKNAME_KEY);
