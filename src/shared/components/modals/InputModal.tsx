import ModalLayout from './ModalLayout';

interface Props {
  title: string;
  content: string;
  onClose?: () => void;
  children: React.ReactNode;
  overlayType?: 'dim' | 'blur';
}

const InputModal = ({
  title,
  content,
  onClose,
  children,
  overlayType,
}: Props) => {
  return (
    <ModalLayout onClose={onClose} size="md" overlayType={overlayType}>
      <div className="flex flex-col">
        <div className="py-5 flex flex-col gap-5">
          <h2 id="modal-title" className="text-black text-center text-3xl">
            {title}
          </h2>
          <p id="modal-content" className="text-gray-dark text-xl text-center">
            {content}
          </p>
        </div>
        {children}
      </div>
    </ModalLayout>
  );
};
export default InputModal;
