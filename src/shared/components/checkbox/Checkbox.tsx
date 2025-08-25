import tw from '@/shared/utils/style';
import { useId } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  showLabel?: boolean;
}

const Checkbox = ({
  id,
  label,
  checked,
  showLabel = false,
  ...restProps
}: CheckboxProps) => {
  const checkboxId = useId();

  return (
    <label
      htmlFor={id ?? checkboxId}
      className="flex gap-2 items-center cursor-pointer w-fit"
    >
      <span
        className={tw(
          showLabel ? 'order-2 text-black text-base select-none' : 'sr-only',
        )}
      >
        {label}
      </span>

      <div
        className={
          'flex justify-center items-center order-1 size-5 border border-gray-dark p-0.5 rounded-sm focus-within:ring-1'
        }
      >
        <input
          id={id ?? checkboxId}
          type="checkbox"
          {...restProps}
          className={tw(
            'appearance-none size-3.5 rounded-sm transition-all duration-100 focus:outline-none',
            checked && 'bg-primary scale-100',
            !checked && 'scale-95',
          )}
          aria-checked={checked}
          aria-describedby={restProps['aria-describedby']}
        />
      </div>
    </label>
  );
};
export default Checkbox;
