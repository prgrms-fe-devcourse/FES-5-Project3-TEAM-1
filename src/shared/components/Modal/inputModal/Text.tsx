import { useRef } from 'react';
import Input from '../../Input';
import InputModal from '../InputModal';

interface Props {
  title: string;
  content: string;
  onSubmit: (value: string) => void;
  onClose: () => void;
  buttonLabel?: string;
  inputLabel: string;
}
/**
 * 일반 input 모달
 */
const Text = ({
  onSubmit,
  inputLabel,
  buttonLabel = '변경하기',
  ...restProps
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (inputRef.current) onSubmit(inputRef.current.value);
  };

  return (
    <InputModal {...restProps}>
      <div role="group" className="flex gap-3 my-5">
        <Input label={inputLabel} showLabel className="flex-1" ref={inputRef} />
        <button
          type="button"
          className="rounded-xl bg-primary p-2 text-nowrap mt-7"
          onClick={handleSubmit}
        >
          {buttonLabel}
        </button>
      </div>
    </InputModal>
  );
};
export default Text;
