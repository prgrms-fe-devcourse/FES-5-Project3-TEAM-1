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

      gsap.set(panel, {
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 0.5,
      });

      gsap.to(panel, {
        autoAlpha: 1,
        scale: 1,
        scrollTrigger: {
          trigger: panel,
          start: 'top 80%', // 패널이 화면에 들어올 때
          end: 'top 30%', // 화면 지나가면 사라짐
          scrub: 0.5, // 스크롤 따라 부드럽게
        },
      });

      gsap.to(panel, {
        autoAlpha: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: panel,
          start: 'top 30%',
          end: 'top 10%',
          scrub: 0.5,
        },
      });
    });
  }, []);

  useImperativeHandle(ref, () => ({ section: sectionRef.current }));

  return (
    <section ref={sectionRef} className="h-[200vh] relative overflow-hidden">
      <Panel01 ref={panelRefs[0]} />
      <Panel02 ref={panelRefs[1]} />
      <Panel03 ref={panelRefs[2]} />
    </section>
  );
});

export default HeroSection02;
