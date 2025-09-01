// HeroSection02_03.tsx
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection02 from './HeroSection02';
import nimoJump from '@/assets/nimo/nimo-jump.png';
import type { HeroSectionProps } from './type/Hero';

gsap.registerPlugin(ScrollTrigger);

const HeroSection02_03 = forwardRef<HeroSectionProps>((_, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const nimoRef = useRef<HTMLImageElement>(null);

  useImperativeHandle(ref, () => ({
    section: wrapperRef.current,
  }));

  useEffect(() => {
    if (!wrapperRef.current || !nimoRef.current) return;

    // GPU 가속 & 깜빡임 방지
    nimoRef.current.style.willChange = 'transform';
    nimoRef.current.style.backfaceVisibility = 'hidden';

    gsap.to(nimoRef.current, {
      y: () => {
        const wrapper = wrapperRef.current!;
        const startTop = nimoRef.current!.offsetTop; // 초기 top 위치
        const wrapperHeight = wrapper.offsetHeight; // wrapper 전체 높이

        // 니모가 화면 아래까지 내려가도록 계산
        return wrapperHeight - startTop - nimoRef.current!.offsetHeight + 20;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-[250vh] overflow-hidden">
      {/* 니모는 wrapper 기준 absolute */}
      <img
        ref={nimoRef}
        src={nimoJump}
        alt="nimo"
        className="absolute left-1/2 top-50 w-40 -translate-x-1/2 z-20"
      />

      {/* 섹션들 */}
      <HeroSection02 />

      {/* <div
        className="absolute px-8 py-10 w-[60vw] h-fit rounded-4xl bottom-[calc(33.3333% - 215px)] bg-white z-20"
        style={{ boxShadow: '0 -10px 20px rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center py-2 gap-10">
          <span className="block w-30 h-30 rounded-full bg-gray-light"></span>
          <div className="flex flex-col gap-5">
            <span className="text-4xl">nimo</span>
            <span className="text-3xl text-gray">2025.09.01</span>
          </div>
        </div>
      </div> */}
    </div>
  );
});

export default HeroSection02_03;
