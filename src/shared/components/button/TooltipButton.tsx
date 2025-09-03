import { forwardRef } from 'react';
import tw from '@/shared/utils/style';

interface TooltipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tooltip: string;
  children: React.ReactNode;
  className?: string;
}

const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ label, tooltip, children, className = '', ...rest }, ref) => {
    return (
      <div className="relative group inline-block">
        <button
          ref={ref}
          aria-label={label}
          className={tw('w-8 h-8 grid place-items-center group', className)}
          {...rest}
        >
          {children}
        </button>
        <span
          role="tooltip"
          className="absolute left-1/2 top-full mt-1 -translate-x-1/2 z-10
                   whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1
                   opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          {tooltip}
        </span>
      </div>
    );
  },
);

export default TooltipButton;
