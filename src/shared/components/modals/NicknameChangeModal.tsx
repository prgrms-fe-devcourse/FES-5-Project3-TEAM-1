import { useRef } from 'react';

import Button from '../button/Button';
import Input from '../Input';
import InputModal from './InputModal';

import { removeNickname, saveNickname } from '@/shared/utils/nickname';
import { toastUtils } from '@/shared/utils/toastUtils';

interface Props {
  onClose: () => void;
}

const NicknameChangeModal = ({ onClose }: Props) => {
  const nicknameRef = useRef<HTMLInputElement | null>(null);

  const handleChangeNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nicknameRef.current) {
      const nickname = nicknameRef.current.value.trim();
      if (nickname.length > 0) {
        saveNickname(nickname);
        toastUtils.success('닉네임이 성공적으로 변경되었습니다.');
        onClose();
      } else {
        removeNickname();
        toastUtils.info('닉네임이 nimo로 변경되었습니다.');
        onClose();
      }
    }
  };

  return (
    <InputModal
      title="닉네임 수정"
      content={
        <>
          <p className="text-lg">변경할 닉네임을 입력해주세요.</p>
          <p className="text-base">빈 값을 입력할 시 'nimo'로 되돌아갑니다.</p>
        </>
      }
      onClose={onClose}
    >
      <form className="flex gap-4 p-3 pt-0" onSubmit={handleChangeNickname}>
        <Input label="닉네임" showLabel ref={nicknameRef} autoFocus />
        <Button color="blue" size="default" className="mt-8" type="submit">
          변경하기
        </Button>
      </form>
    </InputModal>
  );
};
export default NicknameChangeModal;
