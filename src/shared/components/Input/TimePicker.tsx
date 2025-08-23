import Input from './BaseInput';
import clockSVG from '@/assets/icon/clock-15.svg';

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showLabel?: boolean;
  label: string;
}

const TimePicker = (props: TimePickerProps) => {
  return (
    <Input type="time" {...props} leftSection={<img src={clockSVG} alt="" />} />
  );
};
export default TimePicker;
