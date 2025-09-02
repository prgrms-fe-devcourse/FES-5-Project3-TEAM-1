// HeroSection02.tsx
import {
  forwardRef,
  useLayoutEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Panel01 from './component/Panel01';
import Panel02 from './component/Panel02';
import Panel03 from './component/Panel03';

gsap.registerPlugin(ScrollTrigger);

interface PanelPosition {
  top: string;
  left: string;
}

const panelPositions: PanelPosition[] = [
  { top: '50%', left: '25%' }, // Panel01 위치
  { top: '70%', left: '75%' }, // Panel02 위치
  { top: '80%', left: '25%' }, // Panel03 위치
];

const HeroSection02 = forwardRef((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useLayoutEffect(() => {
    const panels = panelRefs
      .map((r) => r.current)
      .filter(Boolean) as HTMLDivElement[];
    if (!panels.length || !sectionRef.current) return;

    panels.forEach((panel, i) => {
      const pos = panelPositions[i];

      // 초기 설정: GPU 가속, 초기 크기/투명도
      gsap.set(panel, {
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        xPercent: -50,
        yPercent: -50,
        scale: 0.5,
        autoAlpha: 0,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      });

      // Timeline으로 opacity + scale을 스크롤 따라 부드럽게 처리
      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            end: 'top 10%',
            scrub: 0.5,
          },
        })
        .to(panel, {
          autoAlpha: 1,
          scale: 1,
          ease: 'power2.out',
          duration: 0.5,
        })
        .to(panel, {
          autoAlpha: 0,
          scale: 0.8,
          ease: 'power2.in',
          duration: 0.5,
        });
    });
  }, []);

  useImperativeHandle(ref, () => ({ section: sectionRef.current }));

  return (
    <section ref={sectionRef} className="h-[150vh] relative overflow-hidden">
      <Panel01 ref={panelRefs[0]} />
      <Panel02 ref={panelRefs[1]} />
      <Panel03 ref={panelRefs[2]} />
    </section>
  );
});

export default HeroSection02;
