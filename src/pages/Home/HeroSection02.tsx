import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroSectionProps } from './type/Hero';
import Panel01 from './component/Panel01';
import Panel02 from './component/Panel02';
import Panel03 from './component/Panel03';
import nimo from '@/assets/nimo/nimo.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection02 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const panels = panelRefs
      .map((r) => r.current)
      .filter(Boolean) as HTMLDivElement[];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 🔹 초기 위치: 화면 아래에서 중앙으로
    panels.forEach((panel) => {
      panel.style.position = 'absolute';
      panel.style.left = '50%';
      panel.style.top = '100%'; // 화면 아래쪽
      panel.style.transform = 'translate(-50%, -50%) scale(0.5)';
      panel.style.opacity = '0';
    });

    // 🔹 목표 좌표 (퍼지는 느낌)
    const positions = [
      { x: -0.25 * screenWidth, y: -0.8 * screenHeight },
      { x: -0.1 * screenWidth, y: -0.4 * screenHeight },
      { x: 0.25 * screenWidth, y: -0.6 * screenHeight },
    ];

    // 🔹 스크롤 트리거 + 순차 애니메이션
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top', // section top이 화면 중앙에 닿았을 때 시작
        toggleActions: 'play none none none',
      },
    });

    panels.forEach((panel, i) => {
      tl.to(
        panel,
        {
          x: positions[i].x,
          y: positions[i].y,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        i * 0.2, // stagger
      );
    });
  }, []);

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
  }));

  return (
    <section
      ref={sectionRef}
      className="h-screen relative flex items-center justify-center overflow-hidden"
    >
      <Panel01 ref={panelRefs[0]} className="panel z-10" />
      <Panel02 ref={panelRefs[1]} className="panel z-10" />
      <Panel03 ref={panelRefs[2]} className="panel z-10" />

      <div className="absolute bottom-30 z-0">
        <img src={nimo} alt="nimo" className="w-50 h-50 object-cover" />
      </div>

      <div
        className="absolute px-10 py-12 w-full h-[140px] rounded-tl-4xl rounded-tr-4xl bottom-0 bg-white z-20"
        style={{ boxShadow: '0 -10px 20px rgba(0,0,0,0.15)' }}
      >
        <div className="flex py-2 gap-10">
          <span className="block w-40 h-40 rounded-full bg-gray-light"></span>
          <div className="flex flex-col gap-5">
            <span className="text-4xl">nimo</span>
            <span className="text-3xl text-gray">2025.09.01</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection02;
