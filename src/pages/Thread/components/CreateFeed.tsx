import FeedInput from '@/shared/components/feed-Input/FeedInput';
import { useFeedUpload } from '../hooks/useFeedUpload';
import { useEffect, useRef, useState } from 'react';
import BackSvg from '@/assets/icon/back02-24.svg?react';
import gsap from 'gsap';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';

interface Props {
  threadId: string;
  token: string;
}

const CreateFeed = ({ threadId, token }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        const input = modalRef.current?.querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >('input, textarea');
        input?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      requestAnimationFrame(() => {
        gsap.to(modalRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power1.out',
        });
      });
    }
  }, [isModalOpen]);

  // 닫기
  const handleCloseModal = () => {
    if (!modalRef.current) return;

    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power1.in',
      onComplete: () => setIsModalOpen(false),
    });
  };

  // 바깥 클릭 또는 ESC 누르면 닫히도록
  useCloseOnOutsideOrEsc({
    ref: modalRef,
    onClose: () => handleCloseModal(),
  });

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
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={modalRef}
          aria-hidden={!isModalOpen}
          className="fixed left-0 top-0 opacity-0 z-50"
        >
          <div className="bg-gray-light w-screen h-screen overflow-auto relative ">
            <div
              className="flex items-center px-2 py-2 h-12 bg-primary-light"
              aria-hidden
            ></div>

            {/* 모달 안 FeedInput */}
            <FeedInput
              content={content}
              setContent={setContent}
              onSubmit={onSubmit}
              onSuccess={() => handleCloseModal()}
              setType={setType}
              drawingRef={drawingRef}
              type={type}
              imageFile={imageFile}
              setImageFile={setImageFile}
              className="rounded-none"
            />

            <button
              className="absolute left-2 top-3 flex items-center gap-1 text-black "
              onClick={() => handleCloseModal()}
              aria-label="피드 목록으로 돌아가기"
            >
              <BackSvg aria-hidden className="w-5 h-5" />
              피드 목록
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateFeed;
