import { useEffect, type RefObject } from 'react';

interface Props<T extends HTMLElement> {
  ref: RefObject<T | null>;
  onClose: () => void;
}

export function useCloseOnOutsideOrEsc<T extends HTMLElement>({
  ref,
  onClose,
}: Props<T>) {
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const refCur = ref.current;
      if (refCur && !refCur.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [ref, onClose]);
}
