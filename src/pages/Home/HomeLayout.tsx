// HomeLayout.tsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import HeroSection01 from './HeroSection01';
import HeroSection02 from './HeroSection02';
// import HeroSection03 from './HeroSection03';
import cloudeImg from '@/assets/cloude.jpg';

import type { HeroSectionProps } from './type/Hero';
import { Lighter } from './Lighter';
import { Outlet } from 'react-router';
import { useModal } from '@/shared/utils/ModalProvider';
import logoUrl from '@/assets/logo.png';
// import HeroSection03 from './HeroSection03';
import HeroSection02_03 from './HeroSection02_03';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HomeLayout() {
  const modal = useModal();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const section01Ref = useRef<HeroSectionProps>(null);
  const section02_03Ref = useRef<HeroSectionProps>(null);

  const smootherRef = useRef<ScrollSmoother | null>(null);

  // Section01 progress 안전하게 적용
  useEffect(() => {
    let rafId: number;

    const updateProgress = () => {
      if (!smootherRef.current) return;

      const scrollTop = smootherRef.current.scrollTop(); // SMOOTHER 기준
      const vh = window.innerHeight;

      if (section01Ref.current?.tl) {
        const progress = Math.min(scrollTop / vh, 1);
        section01Ref.current.tl.progress(progress);
      }

      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 버튼 둥둥 애니메이션
  useEffect(() => {
    if (!buttonRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(buttonRef.current, { y: -6, duration: 1, ease: 'power1.inOut' });
    return () => {
      tl.kill();
    };
  }, []);

  // ScrollSmoother 생성
  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="wrapper" className="relative home-font">
      <div id="content">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${cloudeImg})` }}
        />
        <Lighter />

        <HeroSection01 ref={section01Ref} />

        <HeroSection02_03 ref={section02_03Ref} />
      </div>

      <Outlet />
      <div className="fixed top-5 right-5">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => modal.openModal('login')}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl shadow-md bg-white hover:shadow-lg transition-shadow text-lg"
        >
          <img src={logoUrl} className="w-20" aria-label="anonimo" /> 바로
          이용하기
        </button>
      </div>
    </div>
  );
}
