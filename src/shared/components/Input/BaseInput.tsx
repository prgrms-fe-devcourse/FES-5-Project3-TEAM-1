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
      <div className="flex flex-col gap-2 max-w-3xl w-full">
        <label
          htmlFor={id ?? userId}
          className={tw(showLabel ? `text-black text-sm` : 'sr-only')}
        >
          {label}
        </label>
        <div
          className={tw(
            'flex justify-between items-center gap-2 relative p-3 border-1 border-gray rounded-sm h-12',
            readOnly && 'bg-gray-light',
            !readOnly && 'focus-within:ring-2',
            className,
          )}
        >
          {leftSection}
          <input
            ref={ref}
            id={id ?? userId}
            type={type}
            className={`flex-1 text-base outline-none ${
              type === 'time' ? 'time-input-custom' : ''
            }`}
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
