import tw from '@/shared/utils/style';
import { memo } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const InputActionButton = ({ className, ...restProps }: Props) => {
  return (
    <button
      type="button"
      className={tw(
        'p-1 rounded flex items-center focus-visible:ring-1 cursor-pointer',
        className,
      )}
      {...restProps}
    />
  );
};
export default memo(InputActionButton);
