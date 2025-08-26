import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/Input';
import InputModal from '@/shared/components/modals/InputModal';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  onValidate: (
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  onClose: () => void;
}

const PasswordModal = ({ isOpen, onClose, onValidate }: Props) => {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  // 비밀번호 검증
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (passwordRef.current && passwordRef?.current?.value.trim().length > 0) {
      const { message, success } = await onValidate(passwordRef.current.value);

      if (success) {
        toastUtils.success(message);
        setError('');
        onClose();
      } else {
        toastUtils.error(message);
        setError('검증 실패');
        passwordRef.current.value = '';
      }
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <InputModal
      title="쓰레드 압징하기"
      content="방장이 설정한 비밀번호를 입력해주세요."
      overlayType="blur"
    >
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <Input.Password
          label="비밀번호"
          showLabel
          placeholder={error ? error : '비밀번호를 입력해주세요.'}
          className={error ? 'border-red-400' : ''}
          ref={passwordRef}
        />
        <Button type="submit" size="default" color="blue" className="mt-7">
          {isLoading ? '검증 중..' : '입장'}
        </Button>
      </form>
    </InputModal>
  );
};
export default PasswordModal;
