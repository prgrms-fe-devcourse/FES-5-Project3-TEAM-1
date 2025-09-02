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
import { useModal } from '@/shared/utils/ModalProvider';

gsap.registerPlugin(ScrollTrigger);

const HeroSection02_03 = forwardRef<HeroSectionProps>((_, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const nimoWrapperRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const nimoRef = useRef<HTMLImageElement>(null);
  const modal = useModal();

  useImperativeHandle(ref, () => ({
    section: wrapperRef.current,
  }));

  useEffect(() => {
    if (!wrapperRef.current || !nimoRef.current || !nimoWrapperRef.current)
      return;

    const nimo = nimoRef.current;
    const nimoWrapper = nimoWrapperRef.current;
    let hasReachedBottom = false;
    const jumpHeight = 100; // 살짝 점프 높이

    nimo.style.willChange = 'transform, opacity';
    nimo.style.backfaceVisibility = 'hidden';

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const wrapperHeight = wrapperRef.current!.offsetHeight;
        const wrapperBottomY = wrapperHeight - nimoWrapper.offsetHeight; // div 기준 바닥

        if (self.progress > 0.99 && !hasReachedBottom) {
          hasReachedBottom = true;
          st.disable(); // y 컨트롤 잠시 멈춤

          const tl = gsap.timeline({
            onComplete: () => st.enable(), // 애니 완료 후 재개
          });

          tl.to(nimoWrapper, {
            y: wrapperBottomY - jumpHeight, // 살짝 점프
            duration: 0.5,
            ease: 'power2.out',
          })
            .to(nimo, {
              opacity: 0,
              duration: 0.2,
              onComplete: () => {
                nimo.src = `${nimoHi}?t=${Date.now()}`; // 이미지 교체
                nimo.style.width = '20rem';
              },
            })
            .to(nimo, { opacity: 1, duration: 0.2 })
            .to(nimoWrapper, {
              keyframes: [
                { y: wrapperBottomY + 20, duration: 0.2, ease: 'power2.in' }, // 바닥 지나치며 충격
                { y: wrapperBottomY - 15, duration: 0.15, ease: 'power2.out' }, // 튕겨 올라가는 높이
                { y: wrapperBottomY, duration: 0.1, ease: 'bounce.out' }, // 최종 착지
              ],
            });

          tl.to(
            titleWrapperRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '<',
          );
        } else if (self.progress <= 0.99 && hasReachedBottom) {
          hasReachedBottom = false;
          gsap.to(titleWrapperRef.current, {
            autoAlpha: 0,
            duration: 0.3,
            ease: 'power2.out',
          });

          gsap.to(nimo, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              nimo.src = nimoJump;
              nimo.style.width = '15rem';
            },
          });
          gsap.to(nimo, { opacity: 1, duration: 0.2 });
        }

        // ScrollTrigger가 y를 계속 적용 (점프 전)
        if (!hasReachedBottom) {
          gsap.set(nimoWrapper, {
            y: self.progress * wrapperBottomY,
          });
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-[200vh] overflow-hidden">
      <div
        ref={titleWrapperRef}
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-4"
      >
        <h2 className="text-[4rem] text-center">
          Anonimo를
          <br />
          이용해보세요!
        </h2>
        <button
          type="button"
          onClick={() => modal.openModal('login')}
          className="w-auto text-3xl bg-primary rounded-4xl px-4 py-2 transform transition duration-150 ease-in-out hover:translate-y-0.25 active:translate-y-0.25 hover:bg-primary-light"
        >
          서비스 이용하기
        </button>
      </div>
      {/* 니모 Wrapper */}
      <div
        ref={nimoWrapperRef}
        className="absolute left-1/2 top-0 -translate-x-1/2 flex items-end z-20 "
        style={{ width: 'auto', height: '22.5rem' }} // ScrollTrigger 기준 높이
      >
        <img
          ref={nimoRef}
          src={nimoJump}
          alt="nimo"
          className="w-[15rem] h-auto"
        />
      </div>

      {/* 기능 소개 */}
      <HeroSection02 />

      {/* 하단 집 나무 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-fit after:block after:absolute after:left-0 after:bottom-0 after:w-full after:h-10 after:bg-[#AA7134]">
        {/* 집 */}
        <div
          className="absolute pt-10 pb-0 w-[22.5rem] h-[12.5rem] md:h-[21.875rem] rounded-tl-4xl rounded-tr-4xl left-1/2 -translate-x-1/2 bottom-8 bg-white z-9 flex flex-col gap-2 justify-between"
          style={{ boxShadow: '0 -10px 20px rgba(0,0,0,0.15)' }}
        >
          <div className="flex items-center px-5 py-2 gap-10">
            <span className="relative block w-30 h-30 rounded-full bg-gray-light after:absolute after:block after:right-4 after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-black"></span>
            <div className="flex flex-col gap-5">
              <span className="text-4xl">nimo</span>
              <span className="text-3xl text-gray">welcome!</span>
            </div>
          </div>
          <div className="bg-gray-light h-10 w-full"></div>
        </div>

        {/* 나무 */}
        <div>
          <img
            src={treeLg}
            height="40"
            alt=""
            className="absolute left-[calc(50%-15rem)] -translate-x-1/2 bottom-0 z-10"
          />
          <img
            src={treeSm}
            height="40"
            alt=""
            className="absolute bottom-8 left-[calc(50%+13.125rem)] -translate-x-1/2 z-10"
          />
        </div>
      </div>
    </div>
  );
});

export default HeroSection02_03;
