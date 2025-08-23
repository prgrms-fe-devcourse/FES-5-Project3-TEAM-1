import BaseInput from './BaseInput';
import DeleteIcon from '@/assets/icon/delete-15.svg?react';
import InputActionButton from './InputActionButton';
import { forwardRef } from 'react';

interface RowProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showLabel?: boolean;
  label: string;
  onClick: () => void;
}

const Row = forwardRef<HTMLInputElement, RowProps>(
  ({ onClick, ...restProps }, ref) => {
    const DeleteRowButton = (
      <InputActionButton onClick={onClick}>
        <DeleteIcon className="text-gray-dark hover:text-black" />
      </InputActionButton>
    );

    return (
      <BaseInput ref={ref} {...restProps} rightSection={DeleteRowButton} />
    );
  },
);
export default Row;
