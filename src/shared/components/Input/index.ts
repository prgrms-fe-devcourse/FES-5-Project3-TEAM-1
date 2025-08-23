import BaseInput from './BaseInput';
import Password from './Password';
import Row from './Row';
import TimePicker from './TimePicker';

type InputWithCompounds = typeof BaseInput & {
  Password: typeof Password;
  TimePicker: typeof TimePicker;
  Row: typeof Row;
};

const Input = BaseInput as InputWithCompounds;
Input.Password = Password;
Input.TimePicker = TimePicker;
Input.Row = Row;

export default Input;
