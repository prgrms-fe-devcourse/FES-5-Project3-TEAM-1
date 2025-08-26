/**
 * 세션 유틸
 */
export const sessionStorageUtil = {
  getSession: <T>(key: string): T | null => {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw new Error(`세션 정보를 불러오는 중 에러 발생 : ${error}`);
    }
  },

  setSession: <T>(key: string, value: T): void => {
    try {
      console.log(value);
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(`세션 정보를 저장하는 중 에러 발생 : ${error}`);
    }
  },
};
