import BaseInput from './BaseInput';
import DeleteIcon from '@/assets/icon/delete-15.svg?react';
import InputActionButton from './InputActionButton';

interface RowProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showLabel?: boolean;
  label: string;
  onClick: () => void;
}

const Row = ({ onClick, ...restProps }: RowProps) => {
  const DeleteRowButton = (
    <InputActionButton onClick={onClick}>
      <DeleteIcon className="text-gray-dark hover:text-black" />
    </InputActionButton>
  );

  return <BaseInput {...restProps} rightSection={DeleteRowButton} />;
};
export default Row;
