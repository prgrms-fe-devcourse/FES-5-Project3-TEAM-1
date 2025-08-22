import tw from '@/shared/utils/style';
import TimeSvg from './assets/time.svg';

interface Props {
  className?: string;
  showLabel?: boolean;
  showTime?: boolean;
  label: string;
}

const Input = ({
  className,
  showLabel = true,
  showTime = false,
  label,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className={tw(showLabel ? `text-sm ${className}}` : 'sr-only')}>
        {label}
      </label>
      <div className="max-w-3xl w-full p-3 border-1 border-gray-light rounded-sm h-12">
        {!showTime && <img src={TimeSvg} />}
        <input />
      </div>
    </div>
  );
};
export default Input;
