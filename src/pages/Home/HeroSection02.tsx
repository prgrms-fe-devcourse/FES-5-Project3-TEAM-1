import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroSectionProps } from './type/Hero';

gsap.registerPlugin(ScrollTrigger);

const HeroSection02 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // 패널 가져오기
    const panels =
      containerRef.current.querySelectorAll<HTMLDivElement>('.panel');
    const totalWidth = panels.length * window.innerWidth;

    // 컨테이너 초기 위치 설정
    gsap.set(containerRef.current, { x: 0 });

    // ScrollTrigger 연동되는 timeline
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => totalWidth - window.innerWidth,
        scrub: true,
        pin: true,
        immediateRender: false,
      },
    });

    // 컨테이너 가로 이동 애니메이션
    tl.current.to(containerRef.current, {
      x: -(totalWidth - window.innerWidth),
      ease: 'none',
    });

    // cleanup
    return () => {
      tl.current?.kill();
    };
  }, []);

  // 외부에서 접근 가능하게
  useImperativeHandle(ref, () => ({
    tl: tl.current!,
    section: sectionRef.current,
  }));

  /* panel 백그라운드 색상들은 잘 동작되는지 확인하기 위해 넣었습니다 추후 수정될 예정 */
  return (
    <section ref={sectionRef} className="h-screen overflow-hidden">
      <div ref={containerRef} className="flex h-full w-[300%] relative">
        <div className="panel w-screen flex-shrink-0 flex justify-center items-center h-full">
          <h2 className="text-4xl">Panel 1</h2>
        </div>
        <div className="panel w-screen flex-shrink-0 flex justify-center items-center h-full bg-green-300">
          <h2 className="text-4xl">Panel 2</h2>
        </div>
        <div className="panel w-screen flex-shrink-0 flex justify-center items-center h-full bg-blue-300">
          <h2 className="text-4xl">Panel 3</h2>
        </div>
      </div>
    </section>
  );
});

export default HeroSection02;
