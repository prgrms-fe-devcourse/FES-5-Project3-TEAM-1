import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/Input';
import InputModal from '@/shared/components/modals/InputModal';
import Textarea from '@/shared/components/textarea/Textarea';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function CreateThreads({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <InputModal title="방 만들기" content="" onClose={onClose}>
      {/* children */}
      <div className="flex flex-col gap-5">
        <Input
          label="제목"
          placeholder="20자 내외로 입력해 주세요."
          maxLength={20}
          showLabel
          tabIndex={0}
          autoFocus
        />
        <Textarea
          label="설명"
          placeholder="100자 내외로 입력해 주세요."
          maxLength={100}
          showLabel
        />
        <Input.Password
          label="비밀번호"
          placeholder="10자 내외로 입력해 주세요."
          maxLength={10}
          showLabel
        />
        <Button size="default" color="default" fullWidth>
          만들기
        </Button>
      </div>
    </InputModal>
  );
}
export default CreateThreads;
