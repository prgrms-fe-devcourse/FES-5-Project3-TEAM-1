// HeroSection01.tsx
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import type { HeroSectionProps } from './type/Hero';
import { Lighter } from './Lighter';

const HeroSection01 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const text02Ref = useRef<HTMLParagraphElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<SVGGElement>(null);

  const tl = useRef<GSAPTimeline | null>(null);

  // GPU compositing layer 강제
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.willChange = 'transform, opacity';
      textRef.current.style.backfaceVisibility = 'hidden';
    }
    if (shapeRef.current) {
      shapeRef.current.style.willChange = 'transform';
      shapeRef.current.style.backfaceVisibility = 'hidden';
    }
  }, []);

  // 타임라인 생성
  useEffect(() => {
    if (!shapeRef.current || !textRef.current) return;

    // 초기 상태
    gsap.set(textRef.current, { xPercent: 100, autoAlpha: 1 });
    gsap.set(text02Ref.current, { autoAlpha: 0 });
    gsap.set(shapeRef.current, { scale: 1, rotate: 0 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(shapeRef.current, {
        scale: 60,
        rotate: 240,
        transformOrigin: '50% 50%',
        ease: 'none',
        duration: 2,
      })
      .to(
        textRef.current,
        { xPercent: 0, ease: 'power2.in', duration: 1 },
        '-=1.2',
      )
      // .to(
      //   textRef.current,
      //   { autoAlpha: 0, ease: 'power2.out', duration: 1 },
      //   '-=0.2',
      // )
      .to(text02Ref.current, {
        autoAlpha: 1,
        xPercent: 0,
        ease: 'power2.in',
        duration: 0.7,
      });
  }, []);

  // 외부에서 접근 가능
  useImperativeHandle(ref, () => ({
    tl: tl.current,
    section: sectionRef.current,
  }));

  // 마우스 눈동자 이동
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const { innerWidth, innerHeight } = window;
      const mouseX = e.clientX / innerWidth;
      const mouseY = e.clientY / innerHeight;
      const maxMove = 1;

      gsap.to(eyeRef.current, {
        x: (mouseX - 0.5) * maxMove * 2,
        y: (mouseY - 0.5) * maxMove * 2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh] overflow-hidden">
      <Lighter />

      <div className="flex justify-center items-center h-full mix-blend-multiply bg-black">
        <h1 className="absolute top-[calc(50vh+30px)] left-1/2 -translate-x-1/2">
          <img
            src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/logo-white.webp"
            alt=""
            className="w-[12.5rem]"
          />
        </h1>
        {/* Shape */}
        <div
          ref={shapeRef}
          className="absolute top-1/5 left-1/2 w-30 h-30 md:w-80 md:h-80 -translate-x-1/2 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 8"
            className="w-full h-full"
            fill="none"
          >
            <g clipPath="url(#clip0_949_1068)">
              <path
                d="M4.02264 0.008968C3.07073 0.048593 2.45046 0.213967 1.80248 0.597342C1.21885 0.945592 0.839764 1.33522 0.488258 1.95522C-0.0499282 2.90297 -0.15093 4.10422 0.223762 5.08334C0.631765 6.15409 1.44497 6.78384 2.78211 7.06484C2.93961 7.09784 3.3107 7.11684 3.74163 7.12047C4.59494 7.12359 5.22747 7.02184 6.07918 6.74322C6.37886 6.64659 6.83256 6.49572 7.08933 6.41447C7.74851 6.19784 8.3168 6.10734 8.93547 6.11259C9.75468 6.11947 10.1592 6.20222 11.3628 6.62484C12.6344 7.06797 13.3031 7.20059 14.3015 7.20497C15.4321 7.21047 16.2496 6.94747 16.925 6.36997C18.2071 5.26184 18.3382 3.14422 17.2132 1.64297C16.9604 1.30359 16.4526 0.862968 16.0875 0.657593C15.7055 0.444093 15.0931 0.240593 14.5861 0.152968C14.1686 0.0820931 13.0552 0.0687173 10.4434 0.0944673C9.64555 0.103717 8.26324 0.0880926 7.37168 0.0648426C6.48012 0.0414676 5.48184 0.0132182 5.15338 0.00646818C4.82493 -0.00415682 4.31712 -0.000531995 4.02264 0.008968ZM5.31874 1.91234C6.12289 2.15322 6.64029 2.93509 6.63109 3.89522C6.62297 4.74822 6.20257 5.44297 5.49103 5.77822C5.24239 5.89909 5.19535 5.90659 4.79854 5.90334C4.41892 5.90009 4.34217 5.88759 4.10846 5.78247C3.27992 5.41847 2.83341 4.36722 3.07339 3.35359C3.20224 2.81909 3.56987 2.29847 3.9904 2.05997C4.38068 1.84097 4.88902 1.78572 5.31874 1.91234ZM13.7914 2.06272C14.4926 2.37409 14.9587 3.15559 14.9505 4.00459C14.9427 4.83772 14.5135 5.54434 13.8322 5.84809C13.5707 5.96484 13.5152 5.97634 13.1397 5.97322C12.7643 5.97009 12.7089 5.95772 12.4497 5.83647C11.7446 5.50922 11.3214 4.69234 11.3814 3.77634C11.4116 3.28459 11.5302 2.92847 11.7808 2.60134C12.2649 1.95072 13.0648 1.73922 13.7914 2.06272Z"
                fill="white"
              />
              <g ref={eyeRef}>
                <path
                  d="M4.71953 2.53147C4.32605 2.63672 3.98001 3.11884 3.93258 3.62272C3.83277 4.69259 4.60268 5.40109 5.44253 5.02022C6.34249 4.61272 6.34915 3.01835 5.45293 2.59185C5.29583 2.51297 4.89502 2.48247 4.71953 2.53147Z"
                  fill="white"
                />
                <path
                  d="M12.6892 2.62722C12.4795 2.69147 12.2126 2.93747 12.0779 3.19622C11.7303 3.85284 11.9815 4.79759 12.5846 5.09359C12.8014 5.19622 13.2448 5.21159 13.442 5.12022C13.9264 4.89147 14.2054 4.27697 14.1173 3.64784C14.0611 3.27884 13.9355 3.03334 13.6985 2.82584C13.4066 2.57122 13.0702 2.50634 12.6892 2.62722Z"
                  fill="white"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_949_1068">
                <rect width="18" height="8" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* 텍스트 */}
      <div className="absolute top-1/2 inset-0 flex flex-col gap-[18.75rem] justify-center items-center">
        <p ref={textRef} className="text-black text-3xl md:text-[4rem]">
          진짜 나를 보여주세요,
          <br />
          안전한 익명 공간에서
        </p>
        <p ref={text02Ref} className="text-2xl md:text-[3rem]">
          부담 없이 솔직하게,
        </p>
      </div>
    </section>
  );
});

export default HeroSection01;
