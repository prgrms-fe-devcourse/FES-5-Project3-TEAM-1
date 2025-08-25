import tw from '@/shared/utils/style';
import { useId } from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  showLabel?: boolean;
  label: string;
}

const Textarea = ({
  id,
  className,
  showLabel,
  placeholder = '입력해 주세요.',
  label,
  readOnly,
  ...restProps
}: TextareaProps) => {
  const textareaId = useId();

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id ?? textareaId}
        className={tw(showLabel ? `text-black text-md` : 'sr-only')}
      >
        {label}
      </label>
      <div
        className={tw(
          'flex justify-between gap-2 relative max-w-3xl h-50 w-full p-3 border-1 border-gray rounded-sm',
          readOnly && 'bg-gray-light',
          !readOnly &&
            'focus-within:outline-none focus-within:ring-2 ring-primary-light',
          className,
        )}
      >
        <textarea
          id={id ?? textareaId}
          className={`flex-1 text-base outline-none resize-none`}
          placeholder={placeholder}
          {...restProps}
        ></textarea>
      </div>
    </div>
  );
};
export default Textarea;
