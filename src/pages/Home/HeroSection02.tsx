import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroSectionProps } from './type/Hero';
import Panel01 from './component/Panel01';
import Panel02 from './component/Panel02';
import Panel03 from './component/Panel03';
import Panel04 from './component/Panel04';
import nimo from '@/assets/nimo/nimo.png';
import nimoJump from '@/assets/nimo/nimo-jump.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection02 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const nimoRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = panelRefs
      .slice(0, 3)
      .map((r) => r.current)
      .filter(Boolean) as HTMLDivElement[];
    const panel04 = panelRefs[3].current;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Panel01~03 초기 위치
    panels.forEach((panel) => {
      panel.style.position = 'absolute';
      panel.style.left = '50%';
      panel.style.top = '100%';
      panel.style.transform = 'translate(-50%, -50%) scale(0.5)';
      panel.style.opacity = '0';
    });

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
          duration: 0.6,
          ease: 'power2.out',
        },
        i * 0.1,
      );
    });

    // Panel01~03 사라짐
    tl.to(
      panels,
      {
        autoAlpha: 0,
        duration: 0.15,
        ease: 'power2.inOut',
      },
      '+=0.5',
    );

    // Panel04 등장
    if (panel04) {
      tl.fromTo(
        panel04,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            // Panel04 등장 후 기존 요소 제거
            panels.forEach((p) => p.remove());
            if (cardRef.current) cardRef.current.remove();

            // 니모 점프 & 자연스러운 이미지 변경 + 떨어짐
            if (nimoRef.current) {
              gsap
                .timeline()
                .to(nimoRef.current, {
                  y: -150,
                  duration: 0.4,
                  ease: 'power2.out',
                })
                .to(nimoRef.current, {
                  opacity: 0,
                  duration: 0.25,
                  onComplete: () => {
                    if (nimoRef.current) {
                      nimoRef.current.src = nimoJump;
                      nimoRef.current.style.opacity = '0.8'; // 바로 보이도록
                    }
                  },
                })
                .to(nimoRef.current, {
                  y: screenHeight,
                  duration: 1.2,
                  ease: 'power2.in',
                });
            }
          },
        },
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
        <img
          ref={nimoRef}
          src={nimo}
          alt="nimo"
          className="w-50 h-auto object-cover"
        />
      </div>

      <div
        ref={cardRef}
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
