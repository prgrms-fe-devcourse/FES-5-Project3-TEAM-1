import tw from '@/shared/utils/style';
import CloseSvg from '@/assets/icon/close-24.svg?react';
import Portal from '../portals/Portal';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  onClose?: () => void;
  showCloseBtn?: boolean;
  children: React.ReactNode;
  overlayType?: 'dim' | 'blur';
}

const ModalLayout = ({
  size = 'sm',
  onClose,
  showCloseBtn = true,
  overlayType,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 0);
    return () => clearTimeout(timer);
  }, []);
  //닫기
  const handleClose = useCallback(() => {
    if (!onClose) return;
    setIsOpen(false);
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  // ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);
  return (
    <Portal targetId="modal-root" hasOverlay={false}>
      <div
        className="fixed inset-0 z-[999] grid place-items-center"
        role="presentation"
        onClick={handleClose}
      >
        {/* Overlay */}
        <div
          className={tw(
            'absolute inset-0 transition-opacity duration-200',
            overlayType === 'blur'
              ? 'backdrop-blur-sm bg-black/20'
              : 'bg-[#00000080]',
            isOpen ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden="true"
        />
        {/* 모달 */}
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-content"
          tabIndex={-1}
          className={tw(
            'relative z-[1] w-[calc(100%-12px)] md:w-full p-5 bg-white rounded-2xl shadow-md',
            'transition-all duration-200 ease-out',
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-1',
            size === 'sm' && 'max-w-xs',
            size === 'md' && 'max-w-lg',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 */}
          {showCloseBtn && onClose && (
            <button
              type="button"
              aria-label="팝업창 닫기"
              className="absolute right-5 top-5 text-gray hover:text-gray-dark cursor-pointer"
              onClick={handleClose}
              tabIndex={0}
            >
              {useMemo(
                () => (
                  <CloseSvg aria-hidden />
                ),
                [],
              )}
            </button>
          )}

          {/* 모달 내용 */}
          {children}
        </div>
      </div>
    </Portal>
  );
};
export default ModalLayout;
