import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

const Beom = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) {
      return;
    }

    const tl = gsap.timeline();

    // 초기 위치 설정 (디버깅용 로그 추가)
    gsap.set(image, { y: 150, x: -150 });
    tl.to(
      image,
      {
        y: 0,
        x: 0,
        duration: 0.8,
        ease: 'sine.in',
      },
      0.2,
    )
      .to(
        {},
        {
          duration: 3,
        },
      )
      .to(image, {
        y: 150,
        x: -150,
        duration: 0.8,
        ease: 'sine.in',
      });

    const time = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        angle: 60,
        origin: { y: 0.9, x: 0 },
      });
    }, 1000);

    return () => {
      tl.kill();
      clearTimeout(time);
    };
  }, []);

  return (
    <div className="fixed -bottom-5 -left-10">
      <img
        ref={imageRef}
        src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/easter_egg/BeomS.webp"
        alt=""
      />
    </div>
  );
};

export default Beom;
