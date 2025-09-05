/**
 * 세션 유틸
 */
export const localStorageUtil = {
  getLocal: <T>(key: string): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw new Error(`세션 정보를 불러오는 중 에러 발생 : ${error}`);
    }
  },

  setLocal: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(`세션 정보를 저장하는 중 에러 발생 : ${error}`);
    }
  },

  removeLocalStorage: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw new Error(`세션 정보를 삭제하는 중 에러 발생 : ${error}`);
    }
  },
};
