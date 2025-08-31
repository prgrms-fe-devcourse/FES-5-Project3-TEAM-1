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
    if (!sectionRef.current || !containerRef.current) return;

    const panels =
      containerRef.current.querySelectorAll<HTMLDivElement>('.panel');
    const totalWidth = panels.length * window.innerWidth;

    gsap.set(containerRef.current, { x: 0 });

    // 가로 스크롤
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
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
        start: 'left center',
        toggleActions: 'play none none reverse',
      },
    });

    introTl.to(texts, {
      autoAlpha: 1,
      x: 0,
      backgroundSize: '100%',
      ease: 'power3.out',
      stagger: 0.3,
    });

    // Panel1 배경 스크롤 따라 변화
    if (panel1Ref.current) {
      gsap.to(panel1Ref.current, {
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

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
    background: 'linear-gradient(to right, #799EFF, #799EFF) no-repeat',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    backgroundSize: '0%',
    transition: 'background-size cubic-bezier(.1,.5,.5,1) 0.5s',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden">
      <div ref={containerRef} className="flex h-full w-[300%] relative">
        {/* Panel 1 */}
        <div
          ref={panel1Ref}
          className="panel w-screen flex-shrink-0 flex justify-center items-center h-full"
        >
          <ul className="p-10 grid grid-rows-3 gap-20">
            {[
              '서로 반응을 주고 받고',
              '함께 그림도 그리며',
              '대화를 나눠보아요',
            ].map((text, idx) => (
              <li key={idx}>
                <h2 className="text group" style={textStyle}>
                  {text}
                </h2>
              </li>
            ))}
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
