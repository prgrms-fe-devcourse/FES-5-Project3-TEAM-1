// HeroSection02_03.tsx
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection02 from './HeroSection02';
import nimoJump from '@/assets/nimo/nimo-jump.png';
import nimoHi from '@/assets/nimo/nimo-hi.gif';
import treeLg from '@/assets/tree-lg.png';
import treeSm from '@/assets/tree-sm.png';
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

    const nimo = nimoRef.current;
    let hasReachedBottom = false;
    const bottomOffset = 40; // 추가로 내려오는 거리

    nimo.style.willChange = 'transform, opacity';
    nimo.style.backfaceVisibility = 'hidden';

    gsap.to(nimo, {
      y: () => {
        const wrapper = wrapperRef.current!;
        const wrapperHeight = wrapper.offsetHeight;
        const nimoHeight = nimo.offsetHeight;
        return wrapperHeight - nimoHeight;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          if (self.progress > 0.99 && !hasReachedBottom) {
            gsap.to(nimo, {
              y: `+=${bottomOffset}`, // 바닥에서 추가 하강
              opacity: 0,
              duration: 0.2,
              onComplete: () => {
                nimo.src = `${nimoHi}?t=${Date.now()}`; // 이미지 교체
                nimo.style.height = 'auto';
                gsap.to(nimo, { opacity: 1, duration: 0.2 });
              },
            });
            hasReachedBottom = true;
          } else if (self.progress <= 0.99 && hasReachedBottom) {
            gsap.to(nimo, {
              y: `-=${bottomOffset}`, // 원래 위치 복구
              opacity: 0,
              duration: 0.2,
              onComplete: () => {
                nimo.src = nimoJump;
                nimo.style.width = '10rem'; // 원래 크기
                nimo.style.height = 'auto';
                gsap.to(nimo, { opacity: 1, duration: 0.2 });
              },
            });
            hasReachedBottom = false;
          }
        },
      },
    });
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-[200vh] overflow-hidden">
      {/* 니모는 wrapper 기준 absolute */}
      <img
        ref={nimoRef}
        src={nimoJump}
        alt="nimo"
        className="absolute left-1/2 top-0 w-[15rem] -translate-x-1/2 z-20"
      />

      {/* 섹션들 */}
      <HeroSection02 />

      {/* 집 & 나무 */}
      <div
        className="absolute pt-10 pb-0 w-[360px] h-fit rounded-tl-4xl rounded-tr-4xl left-[300px] bottom-8 bg-white z-9 flex flex-col gap-2 justify-between"
        style={{ boxShadow: '0 -10px 20px rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center px-5 py-2 gap-10">
          <span className="relative block w-30 h-30 rounded-full bg-gray-light after:absolute after:block after:right-4 after:top-1/2 after:-translate-Y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-black"></span>
          <div className="flex flex-col gap-5">
            <span className="text-4xl">nimo</span>
            <span className="text-3xl text-gray">welcome!</span>
          </div>
        </div>
        <div className="bg-gray-light h-10 w-full"></div>
      </div>

      <div className="absolute bottom-0 w-full h-10 bg-[#AA7134]"></div>
      <div className="">
        <img
          src={treeLg}
          height="40"
          alt=""
          className="absolute left-0 bottom-0 z-10"
        />
        <img
          src={treeSm}
          height="40"
          alt=""
          className="absolute bottom-8 left-[560px] z-10"
        />
      </div>
    </div>
  );
});

export default HeroSection02_03;
