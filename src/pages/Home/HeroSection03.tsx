import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroSectionProps } from './type/Hero';
import nimo from '@/assets/nimo/nimo.png';
import nimoJump from '@/assets/nimo/nimo-jump.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection03 = forwardRef<HeroSectionProps>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nimoRef = useRef<HTMLImageElement>(null);

  useImperativeHandle(ref, () => ({ section: sectionRef.current }));

  return (
    <section
      ref={sectionRef}
      className="h-screen relative flex items-center justify-center"
    >
      <img
        ref={nimoRef}
        src={nimo}
        alt="nimo"
        className="absolute top-0 w-50 h-auto object-cover"
      />

      <div
        className="absolute px-8 py-10 w-[60vw] h-fit rounded-4xl top-[200px] bg-white z-20"
        style={{ boxShadow: '0 -10px 20px rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center py-2 gap-10">
          <span className="block w-30 h-30 rounded-full bg-gray-light"></span>
          <div className="flex flex-col gap-5">
            <span className="text-4xl">nimo</span>
            <span className="text-3xl text-gray">2025.09.01</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection03;
