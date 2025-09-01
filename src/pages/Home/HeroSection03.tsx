import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { HeroSectionProps } from './type/Hero';
import { useModal } from '@/shared/utils/ModalProvider';

const HeroSection03 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { openModal } = useModal();

  const handleServiceButtonClick = () => {
    openModal('login');
  };

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
  }));

  return (
    <section
      ref={sectionRef}
      className="h-screen relative flex items-center justify-center overflow-hidden"
    >
      <h2>익명으로 자유롭게 즐겨보아요</h2>
      <button type="button" onClick={handleServiceButtonClick}>
        서비스 이용하기
      </button>
    </section>
  );
});

export default HeroSection03;
