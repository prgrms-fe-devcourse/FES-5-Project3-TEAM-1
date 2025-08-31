import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import HeroSection01 from './HeroSection01';
import HeroSection02 from './HeroSection02';
import type { HeroSectionProps } from './type/Hero';
import { Lighter } from './Lighter';
import { Outlet } from 'react-router';
import { useModal } from '@/shared/utils/ModalProvider';
import logoUrl from '@/assets/logo.png';

export default function HomeLayout() {
  const modal = useModal();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const section01Ref = useRef<HeroSectionProps>(null);
  const section02Ref = useRef<HeroSectionProps>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const vh = window.innerHeight;

      if (section01Ref.current) {
        const progress = Math.min(scrollTop / vh, 1);
        section01Ref.current.tl?.progress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 버튼 둥둥 떠다니는 GSAP 애니메이션
  useEffect(() => {
    if (!buttonRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(buttonRef.current!, {
      y: -6,
      duration: 1,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
      // 명시적으로 void 반환
    };
  }, []);

  return (
    <div className="relative home-font">
      <Lighter />
      <HeroSection01 ref={section01Ref} />
      <HeroSection02 ref={section02Ref} />

      <Outlet />
      <div className="fixed top-5 right-5">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => modal.openModal('login')}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl shadow-md bg-white hover:shadow-lg transition-shadow text-lg"
        >
          <img src={logoUrl} className="w-20 " aria-label="anonimo" /> 바로
          이용하기
        </button>
      </div>
    </div>
  );
}
