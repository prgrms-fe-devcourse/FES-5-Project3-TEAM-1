import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const MomoWithCar = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) return;

    const tl = gsap.timeline();
    gsap.set(image, { x: window.innerWidth + 30 });

    tl.to(image, {
      x: -200,
      duration: 5,
      ease: 'power3.inOut',
    }).to(
      image,
      {
        y: '+=100',
        duration: 1,
        repeat: 4,
        yoyo: true,
        ease: 'sine.inOut',
      },
      0,
    );
  }, []);

  return (
    <div className="fixed top-1/2 -translate-y-1/2">
      <img
        ref={imageRef}
        src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/easter_egg/momo-car.webp"
        alt="momo character with car"
        className="pointer-events-none"
      />
    </div>
  );
};
export default MomoWithCar;
