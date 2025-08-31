import { useCallback, useRef } from 'react';

export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  const lastExecute = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastExecute.current >= delay) {
        lastExecute.current = now;
        callback(...args);
      }
    },
    [callback, delay],
  );
};
