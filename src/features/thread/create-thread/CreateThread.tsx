import { insertThreads } from '@/shared/api/thread';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/Input';
import InputModal from '@/shared/components/modals/InputModal';
import Textarea from '@/shared/components/textarea/Textarea';
import { useRef, useState } from 'react';
import { toastUtils } from '@/shared/utils/toastUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type CreateModalStep = 'form' | 'success';

function CreateThreads({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  const [modalStep, setModalStep] = useState<CreateModalStep>('form');
  const [link, setLink] = useState('');

  // 임시 userId
  const userId = '814fcdb8-c777-4c4f-a74a-c2a8987f0b83';

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState(false);

  const handleCreateInfo = async () => {
    const title = titleRef.current?.value ?? '';
    const description = descriptionRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    const id = crypto.randomUUID();
    const domain = window.location.origin;
    const link = `${domain}/thread/${id}`;

    if (!title) {
      setTitleError(true);
      toastUtils.error('제목을 입력해 주세요.');
      return;
    }
    setTitleError(false);

    await insertThreads({
      id: id,
      owner_id: userId,
      title,
      description,
      password,
      link: link,
      isPrivate: !!password,
    });

    toastUtils.success('방만들기 성공😊');

    setLink(link);
    setModalStep('success');
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      toastUtils.success('복사 성공😊');
    } catch (error) {
      toastUtils.error('복사 실패🥲 다시 시도해 주세요.');
    }
  };

  return (
    <InputModal
      title={modalStep === 'form' ? '방 만들기' : '방 링크'}
      content={
        modalStep === 'form'
          ? ''
          : 'Anonimo의 익명방을 이용하고 싶은 사람들과 이 링크를 공유해보세요. '
      }
      onClose={onClose}
    >
      {/* children */}
      {/* 방 생성 폼 */}
      {modalStep === 'form' && (
        <div className="flex flex-col gap-5">
          <Input
            label="제목"
            placeholder="20자 내외로 입력해 주세요."
            maxLength={20}
            showLabel
            tabIndex={0}
            ref={titleRef}
            autoFocus
            className={titleError ? 'border-red-400' : ''}
            onChange={(e) => {
              if (e.target.value.trim()) {
                setTitleError(false);
              } else {
                setTitleError(true);
              }
            }}
          />
          <Textarea
            label="설명(선택)"
            placeholder="100자 내외로 입력해 주세요."
            maxLength={100}
            ref={descriptionRef}
            showLabel
          />
          <Input.Password
            label="비밀번호(선택)"
            placeholder="10자 내외로 입력해 주세요."
            maxLength={10}
            ref={passwordRef}
            showLabel
          />
          <Button
            size="default"
            color="default"
            onClick={handleCreateInfo}
            fullWidth
          >
            만들기
          </Button>
        </div>
      )}

      {/* 방 생성 완료 시 방링크 내용 */}
      {modalStep === 'success' && (
        <div className="flex flex-col gap-5">
          <div className="flex items-end gap-3">
            <Input
              label="링크"
              maxLength={20}
              value={link}
              showLabel
              readOnly
            />
            <Button
              size="default"
              color="blue"
              onClick={() => handleCopyClipBoard(`${link}`)}
            >
              복사하기
            </Button>
          </div>
          <Button size="default" color="default" fullWidth>
            관리 페이지로 이동
          </Button>
        </div>
      )}
    </InputModal>
  );
}
export default CreateThreads;
