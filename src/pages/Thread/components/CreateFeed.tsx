import FeedInput from '@/shared/components/feed-Input/FeedInput';
import { useFeedUpload } from '../hooks/useFeedUpload';
import { useEffect, useRef, useState } from 'react';
import BackSvg from '@/assets/icon/back02-24.svg?react';
import Portal from '@/shared/components/portals/Portal';

interface Props {
  threadId: string;
  token: string;
}

const CreateFeed = ({ threadId, token }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const timer = setTimeout(() => modalRef.current?.focus(), 0);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const {
    content,
    onSubmit,
    setContent,
    setType,
    drawingRef,
    type,
    imageFile,
    setImageFile,
  } = useFeedUpload({
    threadId,
    token,
  });

  return (
    <div className="relative">
      {/* 모바일에서 버튼 클릭으로 모달 열기 */}
      {isMobile ? (
        <button
          className="flex flex-col w-full px-5 py-6 rounded-xl bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.20)] mb-10 text-gray-dark text-left"
          onClick={() => setIsModalOpen(true)}
        >
          익명으로 자유롭게 의견을 나눠보세요.
        </button>
      ) : (
        <FeedInput
          content={content}
          setContent={setContent}
          onSubmit={onSubmit}
          setType={setType}
          drawingRef={drawingRef}
          type={type}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      )}

      {/* 모바일 모달 레이어 */}
      {isMobile && isModalOpen && (
        <Portal
          hasOverlay={true}
          overlayType="dim"
          onOverlayClick={() => setIsModalOpen(false)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isModalOpen}
            tabIndex={-1}
            className="bg-gray-light w-screen h-screen overflow-auto relative"
          >
            <div className="flex items-center px-2 py-2 h-12 bg-primary-light">
              <button
                className="flex gap-1 text-black"
                onClick={() => setIsModalOpen(false)}
                aria-label="피드 목록으로 돌아가기"
              >
                <BackSvg aria-hidden className="w-5 h-5" />
                피드 목록
              </button>
            </div>

            {/* 모달 안 FeedInput */}
            <FeedInput
              content={content}
              setContent={setContent}
              onSubmit={onSubmit}
              onSuccess={() => setIsModalOpen(false)}
              setType={setType}
              drawingRef={drawingRef}
              type={type}
              imageFile={imageFile}
              setImageFile={setImageFile}
              autoFocus={true}
              className="rounded-none pb-10"
            />
          </div>
        </Portal>
      )}
    </div>
  );
};
export default CreateFeed;
