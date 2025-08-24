import { default as BaseInputModal } from '../InputModal';
import Password from './Password';
import Text from './Text';

type InputWithCompounds = typeof BaseInputModal & {
  Password: typeof Password;
  Text: typeof Text;
};

const InputModal = BaseInputModal as InputWithCompounds;
InputModal.Password = Password;
InputModal.Text = Text;

export default InputModal;
