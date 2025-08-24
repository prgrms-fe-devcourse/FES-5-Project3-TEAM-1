import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import ConfirmModal from '@/shared/components/Modal/ConfirmModal';
import InputModal from '@/shared/components/Modal/InputModal';
import { useState } from 'react';

const ModalTest = () => {
  const [isInputModalOpen, setIsInputModelOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModelOpen] = useState(false);

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
