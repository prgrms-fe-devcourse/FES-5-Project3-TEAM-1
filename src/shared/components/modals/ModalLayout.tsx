import tw from '@/shared/utils/style';
import CloseSvg from '@/assets/icon/close-24.svg?react';
import Portal from '../portals/Portal';
import { useMemo } from 'react';

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
  return (
    <Portal
      targetId="modal-root"
      onOverlayClick={onClose}
      overlayType={overlayType}
    >
      {/* 모달 */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
        tabIndex={-1}
        className={tw(
          'absolute left-1/2 top-1/2  md:top-[30%] -translate-x-1/2 -translate-y-1/2 md:-translate-y-0 w-[calc(100%-12px)] md:w-full p-5 bg-white rounded-2xl shadow-md',
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
            onClick={onClose}
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
    </Portal>
  );
};
export default ModalLayout;
