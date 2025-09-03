import type { Position } from '@/shared/types/position';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onClick: () => void;
  position: Position;
}

const EmojiGridPortal = ({ children, onClick, position }: Props) => {
  const overlayRoot = document.getElementById('emoji-overlay');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape') {
        onClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClick]);

  if (!overlayRoot) return null;
  return createPortal(
    <div
      className="fixed inset-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClick();
      }}
    >
      <div
        className="absolute z-[9999]"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        {children}
      </div>
    </div>,
    overlayRoot,
  );
};
export default EmojiGridPortal;
