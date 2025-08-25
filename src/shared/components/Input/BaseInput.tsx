import tw from '@/shared/utils/style';
import { forwardRef, useId } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showLabel?: boolean;
  label: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      showLabel = false,
      placeholder = '입력해 주세요.',
      label,
      readOnly,
      leftSection,
      type,
      rightSection,
      ...restProps
    },
    ref,
  ) => {
    const userId = useId();

    return (
      <div className="flex flex-col gap-2  w-full">
        <label
          htmlFor={id ?? userId}
          className={tw(showLabel ? `text-black text-md` : 'sr-only')}
        >
          {label}
        </label>
        <div
          className={tw(
            'flex justify-between items-center gap-2 relative p-3 border-1 border-gray rounded-sm h-12',
            readOnly && 'bg-gray-light',
            // !readOnly && 'focus-within:border-yellow focus-within:border-1 ',
            !readOnly &&
              'focus-within:outline-none focus-within:ring-2 ring-primary-light',
            className,
          )}
        >
          {leftSection}
          <input
            ref={ref}
            id={id ?? userId}
            type={type}
            className={tw(
              'flex-1 text-base border-none outline-none',
              readOnly && 'select-none truncate',
              type === 'time' ? 'time-input-custom' : '',
            )}
            placeholder={placeholder}
            readOnly={readOnly}
            {...restProps}
          />
          {rightSection}
        </div>
      </div>
    );
  },
);

export default BaseInput;
