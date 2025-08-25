import tw from '@/shared/utils/style';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  color?: 'default' | 'blue';
  size?: 'sm' | 'default';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color,
      size,
      children,
      className,
      disabled = false,
      fullWidth = false,
      onClick,
      ...restProps
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={tw(
          //공통 스타일
          'inline-flex items-center justify-center rounded-xl text-base',
          'whitespace-nowrap break-keep',
          'transition-transform duration-150 ease-in-out',
          'hover:cursor-pointer',

          disabled
            ? 'bg-gray text-white cursor-not-allowed'
            : [
                color === 'default' &&
                  'bg-black text-white hover:bg-black-light',
                color === 'blue' &&
                  'bg-primary text-black hover:bg-primary-light',

                'hover:shadow-md',
                'active:translate-y-[2px] active:shadow-sm',
              ],

          // size
          size === 'sm' && 'h-[36px] px-4 py-2',
          size === 'default' && 'h-[48px] px-6 py-3',

          //너비
          fullWidth ? 'w-full' : 'w-fit',

          className,
        )}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);

export default Button;
