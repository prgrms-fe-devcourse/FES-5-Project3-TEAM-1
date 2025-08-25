import { useState } from 'react';

import { EmojiPicker } from '@/features/emoji/ui/EmojiPicker';
import Input from '@/shared/components/Input';
import ConfirmModal from '@/shared/components/modals/ConfirmModal';
import InputModal from '@/shared/components/modals/InputModal';
import { useEmoji } from '@/features/emoji/hook/useEmoji';
import Button from '@/shared/components/button/Button';

const feedId = '041f817f-b470-412d-be21-9fc3307b0507';
const token =
  '38b6aef3b54c57426cf3800ac23b9dc17ac6892f7dfe7d184305fc348afa9831';

const ModalTest = () => {
  const [isInputModalOpen, setIsInputModelOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModelOpen] = useState(false);

  const { emojiCounts, handleEmojiClick, myReactions } = useEmoji({
    feedId,
    token,
  });

  return (
    <div className="flex-center gap-4 mt-5">
      <Button
        className="p-2 bg-red text-white rounded-xl"
        onClick={() => setIsInputModelOpen(true)}
      >
        Input Model Open
      </Button>
      <Button
        className="p-2 bg-primary text-white rounded-xl"
        onClick={() => setIsConfirmModelOpen(true)}
      >
        Confirm Model Open
      </Button>

      <div className="w-[300px]">
        <EmojiPicker
          emojiCounts={emojiCounts}
          myReactions={myReactions}
          onEmojiClick={handleEmojiClick}
        />
      </div>

      {isInputModalOpen && (
        <InputModal
          title="닉네임 수정하기"
          content="변경할 닉네임을 적어주세요."
          onClose={() => setIsInputModelOpen(false)}
        >
          {/* children */}
          <>
            <div role="group" className="flex gap-3 my-5">
              <Input
                label="닉네임"
                showLabel
                className="flex-1"
                tabIndex={0}
                autoFocus
              />
              <Button
                className="rounded-xl bg-primary p-2 text-nowrap mt-7"
                onClick={() => {}}
              >
                변경하기
              </Button>
            </div>
          </>
        </InputModal>
      )}

      {/* 스몰 모달 */}
      {isConfirmModalOpen && (
        <ConfirmModal
          title="Alert 제목"
          content="Alert 상세 내용을 알려주세요. Alert 상세 내용을 알려주세요. Alert 상세 내용을 알려주세요. Alert 상세 내용을 알려주세요."
          onConfirm={() => {
            console.log('확인');
            setIsConfirmModelOpen(false);
          }}
          onCancel={() => {
            console.log('취소');
            setIsConfirmModelOpen(false);
          }}
          onClose={() => setIsConfirmModelOpen(false)}
        />
      )}
    </div>
  );
};
export default ModalTest;
