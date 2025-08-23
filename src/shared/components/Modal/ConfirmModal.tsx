import ModalLayout from './ModalLayout';

interface Props {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  content: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({
  content,
  onCancel,
  onConfirm,
  title,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onClose,
}: Props) => {
  return (
    <ModalLayout onClose={onClose} showCloseBtn={false}>
      <div className="py-5 flex flex-col gap-5 mb-5">
        <h2 id="modal-title" className="text-black text-center text-3xl">
          {title}
        </h2>
        <p id="modal-content" className="text-gray-dark text-xl text-center">
          {content}
        </p>
      </div>
      {/* 버튼 그룹 */}
      <div role="group" className="flex justify-between items-center gap-2">
        <button
          type="button"
          className="text-black bg-primary rounded-xl py-3 flex-1 cursor-pointer"
          onClick={onCancel}
          autoFocus
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          className="text-white bg-black rounded-xl py-3 flex-1 cursor-pointer"
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </ModalLayout>
  );
};
export default ConfirmModal;
