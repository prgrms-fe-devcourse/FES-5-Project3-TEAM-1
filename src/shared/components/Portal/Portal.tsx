import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  targetId?: string;
  hasOverlay?: boolean;
  onOverlayClick?: () => void;
}

const Portal = ({
  children,
  targetId = 'portal-root',
  hasOverlay = true,
  onOverlayClick,
}: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const existingElement = document.getElementById(targetId);

    if (!existingElement) {
      const newElement = document.createElement('div');
      newElement.id = targetId;
      document.body.appendChild(newElement);
      setTargetElement(newElement);
    } else {
      setTargetElement(existingElement);
    }
  }, [targetId]);

  useLayoutEffect(() => {
    if (!hasOverlay) return;
    const body = document.body;
    body.classList.add('overflow-hidden');
    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [hasOverlay]);

  // ESC 키 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOverlayClick?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onOverlayClick]);

  if (!targetElement) return null;

  const content = hasOverlay ? (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#00000080] z-[999] flex items-center justify-center"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOverlayClick?.();
        }
      }}
    >
      {children}
    </div>
  ) : (
    <>
      <div
        className="fixed inset-0 z-[998]"
        onClick={onOverlayClick}
        role="presentation"
        aria-hidden="true"
      />
      <div className="relative z-[999]">{children}</div>
    </>
  );

  return createPortal(content, targetElement);
};

export default Portal;
