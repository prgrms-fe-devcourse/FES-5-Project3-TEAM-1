import { forwardRef, useCallback, useState } from 'react';
import EyeOpen from '@/assets/icon/eye-open-15.svg?react';
import EyeClose from '@/assets/icon/eye-close-15.svg?react';
import Input from './BaseInput';
import InputActionButton from './InputActionButton';

interface PasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
  showLabel?: boolean;
  label: string;
}

const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const toggleButton = (
    <InputActionButton
      onClick={handleTogglePassword}
      aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
    >
      {isPasswordVisible ? (
        <EyeOpen className="text-gray-dark hover:text-black" />
      ) : (
        <EyeClose className="text-gray-dark hover:text-black" />
      )}
    </InputActionButton>
  );

  return (
    <Input
      ref={ref}
      type={isPasswordVisible ? 'text' : 'password'}
      rightSection={toggleButton}
      {...props}
    />
  );
});

export default Password;
