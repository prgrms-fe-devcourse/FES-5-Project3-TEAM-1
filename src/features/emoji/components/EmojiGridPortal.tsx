import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  pickerRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  onClick: () => void;
}

const EmojiGridPortal = ({ pickerRef, children, onClick }: Props) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const el = pickerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [pickerRef]);

  return createPortal(
    <div className="fixed inset-0" onClick={onClick}>
      <div
        className="absolute z-[9999]"
        style={{
          top: `${position.top - 5}px`,
          left: `${position.left - 5}px`,
          position: 'absolute',
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
export default EmojiGridPortal;
