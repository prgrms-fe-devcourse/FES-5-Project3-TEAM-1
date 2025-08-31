import { useRef, useEffect } from 'react';
import HeroSection01 from './HeroSection01';
import HeroSection02 from './HeroSection02';
import type { HeroSectionProps } from './type/Hero';
import { Lighter } from './Lighter';
import { Outlet } from 'react-router';

export default function HomeLayout() {
  const section01Ref = useRef<HeroSectionProps>(null);
  const section02Ref = useRef<HeroSectionProps>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const vh = window.innerHeight;

      if (section01Ref.current) {
        const progress = Math.min(scrollTop / vh, 1);
        section01Ref.current.tl?.progress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Lighter />
      <HeroSection01 ref={section01Ref} />
      <HeroSection02 ref={section02Ref} />

      <Outlet />
    </div>
  );
}
