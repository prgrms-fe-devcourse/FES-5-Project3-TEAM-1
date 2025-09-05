import { useThemeStore } from '@/features/dark-mode/hooks/useThemeStore';
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
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={tw(
          //공통 스타일
          'inline-flex items-center justify-center rounded-xl text-base',
          'whitespace-nowrap break-keep',
          'transition-transform duration-150 ease-in-out',
          'hover:cursor-pointer',
          'min-w-[80px]',
          'disabled:cursor-not-allowed',
          'enabled:hover:cursor-pointer',
          disabled
            ? 'bg-gray text-white'
            : [
                color === 'default'
                  ? isDarkMode
                    ? 'bg-gray text-black enabled:hover:bg-black/40'
                    : 'bg-black text-white enabled:hover:bg-black-light'
                  : '',

                color === 'blue'
                  ? isDarkMode
                    ? 'bg-primary text-black enabled:hover:bg-primary-light'
                    : 'bg-primary text-black enabled:hover:bg-primary-light'
                  : '',

                'enabled:hover:shadow-md',
                'enabled:active:translate-y-[2px] active:shadow-sm',
              ],

          // size
          size === 'sm' && 'h-[36px] px-4',
          size === 'default' && 'h-[48px] px-4',

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
