import { useLayoutEffect, useRef, useState } from 'react';
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

  if (!targetElement) return null;

  const content = hasOverlay ? (
    <div
      ref={overlayRef}
      className="flex-center fixed inset-0 bg-[#00000080] z-[999] "
      role="presentation"
      onClick={() => {
        onOverlayClick?.();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onOverlayClick?.();
        }
      }}
    >
      {children}
    </div>
  ) : (
    children
  );

  return createPortal(content, targetElement);
};

export default Portal;
