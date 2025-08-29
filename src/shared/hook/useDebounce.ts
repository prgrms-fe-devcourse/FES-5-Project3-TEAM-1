import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300,
) => {
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }

      timeRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debounce;
};
