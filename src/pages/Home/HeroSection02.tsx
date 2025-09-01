import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroSectionProps } from './type/Hero';
import Panel01 from './component/Panel01';
import Panel02 from './component/Panel02';
import Panel03 from './component/Panel03';
import Panel04 from './component/Panel04';
import nimo from '@/assets/nimo/nimo.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection02 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const panels = panelRefs
      .slice(0, 3)
      .map((r) => r.current)
      .filter(Boolean) as HTMLDivElement[];

    const panel04 = panelRefs[3].current;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 🔹 Panel01~03 초기 위치
    panels.forEach((panel) => {
      panel.style.position = 'absolute';
      panel.style.left = '50%';
      panel.style.top = '100%';
      panel.style.transform = 'translate(-50%, -50%) scale(0.5)';
      panel.style.opacity = '0';
    });

    // 🔹 Panel01~03 목표 좌표
    const positions = [
      { x: -0.25 * screenWidth, y: -0.8 * screenHeight },
      { x: -0.1 * screenWidth, y: -0.4 * screenHeight },
      { x: 0.25 * screenWidth, y: -0.6 * screenHeight },
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        toggleActions: 'play none none none',
      },
    });

    // Panel01~03 등장
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
        i * 0.2,
      );
    });

    // Panel04 등장 전 Panel01~03 사라짐
    tl.to(
      panels,
      {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      '+=0.5',
    );

    // Panel04 등장
    if (panel04) {
      tl.fromTo(
        panel04,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.2',
      );
    }
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
      <Panel04 ref={panelRefs[3]} className="panel z-10" />

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
