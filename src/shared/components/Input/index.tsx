import tw from '@/shared/utils/style';
import clockSVG from '@/assets/icon/clock-15.svg';
import deleteSVG from '@/assets/icon/delete-15.svg';
import openEye from '@/assets/icon/eye-open-15.svg';
import closeEye from '@/assets/icon/eye-close-15.svg';
import { useId, useState } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  showLabel?: boolean;
  showDelete?: boolean;
  label: string;
  onDelete?: () => void;
}

type InputProps = Props &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    type?: 'text' | 'password' | 'time';
  };

const Input = ({
  id,
  className,
  showLabel = false,
  showDelete = false,
  placeholder = '입력해 주세요.',
  type = 'text',
  label,
  onDelete,
  readOnly,
  ...restProps
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const userId = useId();

  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const actualType = type === 'password' && isPasswordVisible ? 'text' : type;
  const isPasswordType = type === 'password';
  const isTimeType = type === 'time';

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id ?? userId}
        className={tw(
          showLabel ? `text-black text-sm ${className}` : 'sr-only',
        )}
      >
        {label}
      </label>
      <div
        className={clsx(
          'flex justify-between gap-2 relative max-w-3xl w-full p-3 border-1 border-gray rounded-sm h-12 ',
          readOnly && 'bg-gray-light',
          !readOnly && 'focus-within:ring-2',
        )}
      >
        {isTimeType && <img src={clockSVG} alt="" />}
        <input
          id={id ?? userId}
          type={actualType}
          className={`flex-1 text-base outline-none ${
            isTimeType ? 'time-input-custom' : ''
          }`}
          placeholder={placeholder}
          {...restProps}
          readOnly={readOnly}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="p-1 rounded flex items-center focus-visible:ring-1"
            aria-label={isPasswordVisible ? '비밀번호 보기' : '비밀번호 숨기기'}
          >
            <img src={isPasswordVisible ? openEye : closeEye} alt="" />
          </button>
        )}
        {showDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-1 rounded flex items-center focus-visible:ring-1"
            aria-label="입력 삭제"
          >
            <img src={deleteSVG} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};
export default Input;
