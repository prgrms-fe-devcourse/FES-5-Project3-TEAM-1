import tw from '@/shared/utils/style';
import CloseSvg from '@/assets/icon/close-24.svg?react';
import Portal from '../portals/Portal';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  onClose: () => void;
  showCloseBtn?: boolean;
  children: React.ReactNode;
}

const ModalLayout = ({
  size = 'sm',
  onClose,
  showCloseBtn = true,
  children,
}: Props) => {
  return (
    <Portal targetId="modal-root" onOverlayClick={onClose}>
      {/* 모달 */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
        tabIndex={-1}
        className={tw(
          'relative w-full p-5 bg-white rounded-2xl shadow-md',
          size === 'sm' && 'max-w-xs',
          size === 'md' && 'max-w-lg',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        {showCloseBtn && (
          <button
            type="button"
            aria-label="팝업창 닫기"
            className="absolute right-5 top-5 text-gray hover:text-gray-dark cursor-pointer"
            onClick={onClose}
            tabIndex={0}
          >
            <CloseSvg aria-hidden />
          </button>
        )}

        {/* 모달 내용 */}
        {children}
      </div>
    </Portal>
  );
};
export default ModalLayout;
