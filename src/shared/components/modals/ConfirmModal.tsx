import Button from '../button/Button';
import ModalLayout from './ModalLayout';

interface Props {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  content: React.ReactNode;
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
      <div className="py-5 flex flex-col gap-4 mb-5">
        <h2 id="modal-title" className="text-black text-center text-xl">
          {title}
        </h2>
        <div id="modal-content" className="text-gray-dark text-lg text-center">
          {content}
        </div>
      </div>
      {/* 버튼 그룹 */}
      <div role="group" className="flex justify-between items-center gap-2">
        <Button
          size="sm"
          color="blue"
          className="flex-1"
          autoFocus
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          size="sm"
          color="default"
          className="flex-1"
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </ModalLayout>
  );
};
export default ConfirmModal;
