import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import type { HeroSectionProps } from './type/Hero';

const HeroSection01 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<SVGGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // 타임라인 정의
  const tl = useRef(gsap.timeline({ paused: true })).current;
  useEffect(() => {
    if (!overlayRef.current) return;

    tl.to(shapeRef.current, {
      scale: 50,
      rotate: 240,
      transformOrigin: '50% 50%',
      ease: 'expo.in',
      duration: 2,
    })
      .to(textRef.current, { x: 0, ease: 'power2.in', duration: 0.7 }, '-=1.2')
      .to(
        overlayRef.current,
        { opacity: 1, ease: 'power2.inOut', duration: 1 }, // 검정 배경 점점 나타남
        '-=0.5',
      )
      .to(
        textRef.current,
        { autoAlpha: 0, ease: 'power2.out', duration: 1 },
        '-=0.2',
      );
  }, []);

  // 외부에서 접근 가능하게
  useImperativeHandle(ref, () => ({
    tl,
    section: sectionRef.current,
  }));

  // 마우스에 따른 눈동자 이동만 내부 처리
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
    <section
      ref={sectionRef}
      className="overlay sticky top-0 h-screen overflow-hidden bg-bg-sub"
    >
      {/* 검정 overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 -z-10 bg-black opacity-0"
      ></div>
      {/* 텍스트 */}
      <div className="text absolute inset-0 flex justify-center items-center z-10">
        <div
          ref={textRef}
          className="text-white text-4xl transform translate-x-[100vw]"
        >
          익명으로 자유롭고 편하게
        </div>
      </div>

      {/* Shape */}
      <div className="shape flex justify-center items-center h-full">
        <div
          ref={shapeRef}
          className="rotate w-80 h-80 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 8"
            className="w-full h-full"
            fill="#0E162B"
          >
            <g clipPath="url(#clip0_949_1068)">
              <path
                d="M4.02264 0.008968C3.07073 0.048593 2.45046 0.213967 1.80248 0.597342C1.21885 0.945592 0.839764 1.33522 0.488258 1.95522C-0.0499282 2.90297 -0.15093 4.10422 0.223762 5.08334C0.631765 6.15409 1.44497 6.78384 2.78211 7.06484C2.93961 7.09784 3.3107 7.11684 3.74163 7.12047C4.59494 7.12359 5.22747 7.02184 6.07918 6.74322C6.37886 6.64659 6.83256 6.49572 7.08933 6.41447C7.74851 6.19784 8.3168 6.10734 8.93547 6.11259C9.75468 6.11947 10.1592 6.20222 11.3628 6.62484C12.6344 7.06797 13.3031 7.20059 14.3015 7.20497C15.4321 7.21047 16.2496 6.94747 16.925 6.36997C18.2071 5.26184 18.3382 3.14422 17.2132 1.64297C16.9604 1.30359 16.4526 0.862968 16.0875 0.657593C15.7055 0.444093 15.0931 0.240593 14.5861 0.152968C14.1686 0.0820931 13.0552 0.0687173 10.4434 0.0944673C9.64555 0.103717 8.26324 0.0880926 7.37168 0.0648426C6.48012 0.0414676 5.48184 0.0132182 5.15338 0.00646818C4.82493 -0.00415682 4.31712 -0.000531995 4.02264 0.008968ZM5.31874 1.91234C6.12289 2.15322 6.64029 2.93509 6.63109 3.89522C6.62297 4.74822 6.20257 5.44297 5.49103 5.77822C5.24239 5.89909 5.19535 5.90659 4.79854 5.90334C4.41892 5.90009 4.34217 5.88759 4.10846 5.78247C3.27992 5.41847 2.83341 4.36722 3.07339 3.35359C3.20224 2.81909 3.56987 2.29847 3.9904 2.05997C4.38068 1.84097 4.88902 1.78572 5.31874 1.91234ZM13.7914 2.06272C14.4926 2.37409 14.9587 3.15559 14.9505 4.00459C14.9427 4.83772 14.5135 5.54434 13.8322 5.84809C13.5707 5.96484 13.5152 5.97634 13.1397 5.97322C12.7643 5.97009 12.7089 5.95772 12.4497 5.83647C11.7446 5.50922 11.3214 4.69234 11.3814 3.77634C11.4116 3.28459 11.5302 2.92847 11.7808 2.60134C12.2649 1.95072 13.0648 1.73922 13.7914 2.06272Z"
                fill="#0E162B"
              />
              <g ref={eyeRef}>
                <path
                  d="M4.71953 2.53147C4.32605 2.63672 3.98001 3.11884 3.93258 3.62272C3.83277 4.69259 4.60268 5.40109 5.44253 5.02022C6.34249 4.61272 6.34915 3.01835 5.45293 2.59185C5.29583 2.51297 4.89502 2.48247 4.71953 2.53147Z"
                  fill="#0E162B"
                />
                <path
                  d="M12.6892 2.62722C12.4795 2.69147 12.2126 2.93747 12.0779 3.19622C11.7303 3.85284 11.9815 4.79759 12.5846 5.09359C12.8014 5.19622 13.2448 5.21159 13.442 5.12022C13.9264 4.89147 14.2054 4.27697 14.1173 3.64784C14.0611 3.27884 13.9355 3.03334 13.6985 2.82584C13.4066 2.57122 13.0702 2.50634 12.6892 2.62722Z"
                  fill="#0E162B"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_949_1068">
                <rect width="18" height="8" fill="black" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Gradient background */}
      {/* <div className="gradient fixed inset-0 bg-gradient-to-br from-secondary via-quaternary via-[65%] to-white -z-10"></div> */}
    </section>
  );
});
export default HeroSection01;
