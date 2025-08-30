import { useRef, useEffect } from 'react';
import HeroSection01 from './HeroSection01';
import HeroSection02 from './HeroSection02';
import type { HeroSectionProps } from './type/Hero';

export default function HomeLayout() {
  const section01Ref = useRef<HeroSectionProps>(null);
  const section02Ref = useRef<HeroSectionProps>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const vh = window.innerHeight;

      // Section01
      if (section01Ref.current) {
        const progress = Math.min(scrollTop / vh, 1);
        section01Ref.current.tl?.progress(progress);
      }

      // Section02(가로스크롤)는 ScrollTrigger가 내부에서 모든 애니메이션 관리
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <HeroSection01 ref={section01Ref} />
      <HeroSection02 ref={section02Ref} />
    </div>
  );
}
