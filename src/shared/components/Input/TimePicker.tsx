import Input from './BaseInput';
import ClockSVG from '@/assets/icon/clock-15.svg?react';

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showLabel?: boolean;
  label: string;
}

const TimePicker = (props: TimePickerProps) => {
  return (
    <Input type="time" {...props} leftSection={<ClockSVG aria-hidden />} />
  );
};
export default TimePicker;
