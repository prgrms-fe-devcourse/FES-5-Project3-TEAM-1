import { memo, useState } from 'react';

import Button from '../button/Button';
import Input from '../Input';
import InputModal from './InputModal';

import nimo from '@/assets/nimo/nimo-sm.png';

import {
  getNicknameFromSession,
  removeNickname,
  saveNickname,
} from '@/shared/utils/nickname';
import { toastUtils } from '@/shared/utils/toastUtils';

const MemoizedUserButton = memo(Button);

interface Props {
  onClose: () => void;
}

const NicknameChangeModal = ({ onClose }: Props) => {
  const [inputNickname, setInputNickname] = useState(
    getNicknameFromSession() || '',
  );

  const handleChangeNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nickname = inputNickname.trim();
    if (nickname.length > 0) {
      saveNickname(nickname);
      toastUtils.success('닉네임이 성공적으로 변경되었습니다.');
      onClose();
    } else {
      removeNickname();
      toastUtils.info('닉네임이 nimo로 변경되었습니다.');
      onClose();
    }
  };

  return (
    <InputModal
      title="닉네임 수정"
      content={
        <>
          <p className="text-lg">변경할 닉네임을 입력해주세요.</p>
          <p className="text-base"></p>
        </>
      }
      onClose={onClose}
    >
      <div className="flex flex-col gap-5">
        <form className="flex gap-4" onSubmit={handleChangeNickname}>
          <Input
            label="닉네임"
            autoFocus
            value={inputNickname}
            placeholder="빈 값을 입력할 시 'nimo'로 되돌아갑니다."
            onChange={(e) => setInputNickname(e.target.value)}
          />
          <MemoizedUserButton color="blue" size="default" type="submit">
            변경하기
          </MemoizedUserButton>
        </form>
        <div className="rounded-xl p-3 flex gap-2 border border-gray-light">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-gray-light flex items-center justify-center">
              <img src={nimo} alt="" className="size-8" aria-hidden />
            </div>
          </div>
          <div>
            <p className="text-base text-black">{inputNickname || 'nimo'}</p>
            <p className="text-sm text-gray-dark">2025.05.21</p>
          </div>
        </div>
      </div>
    </InputModal>
  );
};
export default NicknameChangeModal;
