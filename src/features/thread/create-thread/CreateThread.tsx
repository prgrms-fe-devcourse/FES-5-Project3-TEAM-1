import { useEffect, useRef, useState } from 'react';

import {
  getThreadInfo,
  insertThreads,
  updateThreads,
} from '@/shared/api/thread';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/Input';
import InputModal from '@/shared/components/modals/InputModal';
import Textarea from '@/shared/components/textarea/Textarea';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useAuth } from '@/shared/utils/AuthProvider';
import CopySvg from '@/assets/icon/copy-right-24.svg?react';
import QrCode from '@/shared/components/qr/QrCode';

interface Props {
  onClose: () => void;
  mode: 'create' | 'update';
  threadId?: string;
  navigateToAdmin?: () => void;
}

type CreateModalStep = 'form' | 'success';

function CreateThreads({ onClose, mode, threadId, navigateToAdmin }: Props) {
  const [modalStep, setModalStep] = useState<CreateModalStep>('form');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const { userId } = useAuth();
  const qrRef = useRef<any>(null);

  const handleGoToAdminAndClose = () => {
    onClose();
    navigateToAdmin?.();
  };

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initUpdateForm = async () => {
      try {
        if (mode === 'update' && threadId) {
          /*
			1. threadData 불러오는 함수
			2. (1)에서 불러온 데이터를 form에 뿌리기
			 */
          const data = await getThreadInfo(threadId);
          if (data) {
            if (titleRef.current) titleRef.current.value = data.title;
            if (descriptionRef.current)
              descriptionRef.current.value = data.description ?? '';
            if (passwordRef.current)
              passwordRef.current.value = data.password ?? '';
          }
        }
      } catch (error) {
        console.error('Thread 데이터 불러오는 중 에러 : ', error);
      }
    };
    initUpdateForm();
  }, [mode]);

  const handleCreateInfo = async () => {
    if (!userId) {
      toastUtils.error('로그인이 필요합니다.');
      return;
    }

    const title = titleRef.current?.value ?? '';
    const description = descriptionRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    const id = crypto.randomUUID();
    const domain = window.location.origin;
    const link = `${domain}/thread/${id}`;

    if (!title.trim()) {
      toastUtils.error('제목을 입력해 주세요.');
      return;
    }

    await insertThreads({
      id: id,
      owner_id: userId,
      title,
      description,
      password,
      link: link,
      isPrivate: !!password,
    });

    toastUtils.success('스레드 생성 성공😊');

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

  const handleSubmit = async () => {
    const title = titleRef.current?.value ?? '';
    const description = descriptionRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';
    const isPrivate = password === '' ? false : true;

    if (!title.trim()) {
      toastUtils.error('제목을 입력해 주세요.');
      return;
    }

    try {
      if (mode === 'create') {
        await handleCreateInfo();
      } else {
        if (!threadId) throw new Error('Cannot find threadId');
        await updateThreads({
          id: threadId,
          title,
          description,
          password,
          isPrivate,
        });

        toastUtils.success('스레드 정보가 수정되었습니다 ✨');
        onClose();
      }
    } catch (error) {
      console.error(error);
      if (mode === 'create') {
        toastUtils.error('스레드 생성에 실패했습니다.');
      } else {
        toastUtils.error('스레드 정보 수정에 실패했습니다.');
      }
      toastUtils.success('스레드 정보가 수정되었습니다 ✨');
      onClose();
    }
  };
  return (
    <InputModal
      title={
        mode === 'create'
          ? modalStep === 'form'
            ? '스레드 만들기'
            : '스레드 링크'
          : '스레드 정보 수정하기'
      }
      content={
        modalStep === 'form' ? (
          ''
        ) : (
          <p>
            Anonimo의 익명 스레드를
            <br />
            이용하고 싶은 사람들과 이 링크를 공유해보세요.
          </p>
        )
      }
      onClose={onClose}
    >
      {/* children */}
      {/* 스레드 생성 폼 */}
      {modalStep === 'form' && (
        <div className="flex flex-col gap-5 text-black">
          <Input
            label="제목"
            placeholder="20자 내외로 입력해 주세요."
            maxLength={20}
            showLabel
            tabIndex={0}
            ref={titleRef}
            autoFocus
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
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
            placeholder="6자 내외로 입력해 주세요."
            maxLength={6}
            ref={passwordRef}
            showLabel
          />
          <Button
            size="default"
            color="default"
            onClick={handleSubmit}
            fullWidth
            disabled={title.trim().length === 0}
          >
            {mode === 'create' ? '만들기' : '수정'}
          </Button>
        </div>
      )}

      {/* 스레드 생성 완료 시 스레드 링크 내용 */}
      {modalStep === 'success' && (
        <div className="flex flex-col relative gap-5">
          <div className="flex items-end gap-3">
            <Input
              label="링크"
              maxLength={20}
              value={link}
              showLabel
              readOnly
              className="pr-20"
            />
            <button
              onClick={() => handleCopyClipBoard(`${link}`)}
              className="absolute right-0 flex-center gap-1 min-w-[80px] h-12 rounded-2xl opacity-80"
            >
              <CopySvg />
              복사
            </button>
          </div>
          <QrCode qrRef={qrRef} title={title} url={link} />
          <div className="flex gap-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              aria-label={`지금 생성한 스레드로 이동`}
              className="inline-flex items-center justify-center rounded-xl text-base
             h-[48px] px-4 bg-primary text-black hover:bg-primary-light
             w-full transition-transform duration-150 ease-in-out"
            >
              지금 생성한 스레드
            </a>

            <Button
              size="default"
              color="default"
              onClick={handleGoToAdminAndClose}
              fullWidth
            >
              내 스레드 관리
            </Button>
          </div>
        </div>
      )}
    </InputModal>
  );
}
export default CreateThreads;
