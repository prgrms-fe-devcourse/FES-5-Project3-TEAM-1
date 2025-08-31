import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroSectionProps } from './type/Hero';

gsap.registerPlugin(ScrollTrigger);

const HeroSection02 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !panel1Ref.current)
      return;

    const panels =
      containerRef.current.querySelectorAll<HTMLDivElement>('.panel');
    const totalWidth = panels.length * window.innerWidth;

    gsap.set(containerRef.current, { x: 0 });

    // 가로 스크롤
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top+=1px top',
        end: () => (totalWidth - window.innerWidth) * 1.5,
        scrub: true,
        pin: true,
        immediateRender: false,
      },
    });

    tl.current.to(containerRef.current, {
      x: -(totalWidth - window.innerWidth),
      ease: 'none',
    });

    // Panel1 텍스트 애니메이션
    const texts = panels[0].querySelectorAll<HTMLElement>('.text');
    gsap.set(texts, { autoAlpha: 0, x: 50 });

    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: panels[0],
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    introTl.to(texts, {
      autoAlpha: 1,
      x: 0,
      backgroundSize: '100%',
      ease: 'power3.out',
      stagger: 0.3,
      duration: 1.5,
    });

    // Panel1 폭죽 이모지 (텍스트 중앙 기준, 위쪽으로 퍼짐)
    const createEmojiExplosion = () => {
      const container = panel1Ref.current;
      if (!container) return;

      const textElement = container.querySelector<HTMLElement>('.text');
      if (!textElement) return;

      // 패널 내부 좌표 기준 중앙
      const centerX = textElement.offsetLeft + textElement.offsetWidth / 2;
      const centerY = textElement.offsetTop + textElement.offsetHeight / 2;

      const emojis = ['❤️', '😊', '🫥', '😍', '🤯', '✨', '🌟', '🎉'];
      const count = 30;

      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = 'absolute';
        el.style.left = `${centerX}px`;
        el.style.top = `${centerY}px`;
        el.style.fontSize = `${Math.random() * 20 + 30}px`;
        el.style.opacity = '1';
        el.style.pointerEvents = 'none';
        el.style.textShadow = `0 0 ${Math.random() * 10 + 5}px #fff`;
        container.appendChild(el);

        // -90° ± 45° 범위로 위쪽 퍼지기
        const angle = -Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 2;
        const distance = Math.random() * 200 + 100;
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);

        gsap.to(el, {
          x,
          y,
          rotation: Math.random() * 360,
          duration: 2 + Math.random(),
          ease: 'power2.out',
          onComplete: () => el.remove(),
        });
      }
    };
    ScrollTrigger.create({
      trigger: panel1Ref.current,
      start: 'top center',
      onEnter: createEmojiExplosion,
      onEnterBack: createEmojiExplosion,
    });

    return () => {
      tl.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useImperativeHandle(ref, () => ({
    tl: tl.current!,
    section: sectionRef.current,
  }));

  const textStyle: React.CSSProperties = {
    fontSize: '4rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: 'rgba(182,182,182,0.2)',
    background: 'linear-gradient(to right, #FEFAE0, #FEFAE0) no-repeat',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    backgroundSize: '0%',
    transition: 'background-size cubic-bezier(.1,.5,.5,1) 0.5s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden relative">
      <div ref={containerRef} className="flex h-full w-[300%] relative">
        {/* Panel 1 */}
        <div
          ref={panel1Ref}
          className="panel w-screen flex-shrink-0 flex justify-center items-center h-full"
        >
          <ul className="flex flex-col gap-4">
            {['다양한 이모지로', '서로의 반응을 주고 받아요'].map(
              (text, idx) => (
                <li key={idx}>
                  <h2 className="text group" style={textStyle}>
                    {text}
                  </h2>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Panel 2 */}
        <div className="panel w-screen flex-shrink-0 flex justify-center items-center h-full bg-green-300">
          <h2 className="text-4xl">Panel 2</h2>
        </div>

        {/* Panel 3 */}
        <div className="panel w-screen flex-shrink-0 flex justify-center items-center h-full bg-blue-300">
          <h2 className="text-4xl">Panel 3</h2>
        </div>
      </div>
    </section>
  );
});

export default HeroSection02;
