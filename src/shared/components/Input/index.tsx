import tw from '@/shared/utils/style';
import clockSVG from '@/assets/icon/clock-15.svg';
import deleteSVG from '@/assets/icon/delete-15.svg';

interface Props {
  className?: string;
  showLabel?: boolean;
  showTime?: boolean;
  showDelete?: boolean;
  label: string;
}

const Input = ({
  className,
  showLabel = true,
  showTime = false,
  showDelete = false,
  label,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className={tw(showLabel ? `text-sm ${className}}` : 'sr-only')}>
        {label}
      </label>
      <div
        className="flex
       max-w-3xl w-full p-3 border-1 border-gray-light rounded-sm h-12"
      >
        {!showTime && <img src={clockSVG} />}
        <input />
        {!showDelete && <img src={deleteSVG} />}
      </div>
    </div>
  );
};
export default Input;
