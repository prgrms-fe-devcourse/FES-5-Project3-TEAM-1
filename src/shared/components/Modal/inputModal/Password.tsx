import Input from '@/shared/components/Input';
import InputModal from '../InputModal';

interface Props {
  title: string;
  content: string;
  value: string;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (value: string) => void;
}
/**
 * 비밀번호 input 모달창
 */
const Password = ({ value, onSubmit, onChange, ...restProps }: Props) => {
  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <InputModal {...restProps}>
      <div role="group" className="flex gap-3 my-5">
        <Input.Password
          label="비밀번호"
          showLabel
          className="flex-1"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="rounded-xl bg-primary p-2 text-nowrap mt-7"
          onClick={handleSubmit}
        >
          변경하기
        </button>
      </div>
    </InputModal>
  );
};
export default Password;
