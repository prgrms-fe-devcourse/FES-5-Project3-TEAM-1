import tw from '@/shared/utils/style';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  color?: 'default' | 'blue';
  size?: 'sm' | 'default';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button = ({
  color,
  size,
  children,
  className,
  disabled,
  fullWidth,
  onClick,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={tw(
        //공통 스타일
        'inline-flex items-center justify-center rounded-xl',
        'transition-transform duration-150 ease-in-out',

        disabled
          ? 'bg-gray text-white cursor-not-allowed'
          : [
              color === 'default' &&
                'bg-black text-white hover:cursor-pointer hover:bg-black-light',
              color === 'blue' &&
                'bg-primary text-black hover:cursor-pointer hover:bg-primary-light',

              'hover:shadow-md',
              'active:translate-y-[2px] active:shadow-sm',
            ],

        // size
        size === 'sm' && 'h-[36px] px-4 py-2 text-sm ',
        size === 'default' && 'h-[48px] px-6 py-3 text-base ',

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
};

export default Button;
