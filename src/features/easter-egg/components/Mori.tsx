// components/easter-egg/Mori.tsx
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const Mori = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const pawprintsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [rightOffset, setRightOffset] = useState(24); // 설정 메뉴 바깥쪽

  // 설정 메뉴 폭 측정
  useEffect(() => {
    const computeOffset = () => {
      const aside = document.querySelector(
        'aside[aria-label="설정 메뉴"]',
      ) as HTMLElement | null;

      if (!aside) {
        setRightOffset(24);
        return;
      }

      const rect = aside.getBoundingClientRect();
      const isOpen = rect.right >= window.innerWidth - 2;
      setRightOffset(isOpen ? rect.width + 24 : 24);
    };

    computeOffset();
    window.addEventListener('resize', computeOffset);

    const aside = document.querySelector('aside[aria-label="설정 메뉴"]');
    const mo = aside ? new MutationObserver(computeOffset) : null;
    if (aside && mo) {
      mo.observe(aside, {
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
    }

    // 컨페티 실행 (한 번만)
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        angle: 60,
        origin: { x: 0.9, y: 0.9 },
      });
    }, 1000);

    return () => {
      window.removeEventListener('resize', computeOffset);
      mo?.disconnect();
    };
  }, []);

  // 애니메이션
  useEffect(() => {
    const image = imageRef.current;
    const pawprints = pawprintsRef.current.filter((el): el is HTMLDivElement =>
      Boolean(el),
    );
    if (!image) return;

    const tl = gsap.timeline();

    // 초기 상태
    gsap.set(image, {
      x: 160,
      y: 0,
      scale: 0.9,
      rotation: -6,
      opacity: 0,
    });

    gsap.set(pawprints, {
      opacity: 0,
      scale: 0.5,
      rotation: (i: number) => -15 + i * 5,
    });

    // 모리 등장
    tl.to(image, {
      x: 0,
      opacity: 1,
      duration: 0.55,
      ease: 'power3.out',
    })
      .to(image, {
        y: -10,
        scale: 1,
        rotation: 0,
        duration: 0.18,
        ease: 'back.out(2)',
      })
      .to(image, { y: 0, duration: 0.18, ease: 'power2.out' })
      .to({}, { duration: 2.2 })
      // 퇴장
      .to(image, {
        x: 160,
        opacity: 0,
        scale: 0.9,
        rotation: -6,
        duration: 0.45,
        ease: 'power2.in',
      })
      // 발자국 나타나기
      .to(
        pawprints,
        {
          opacity: 0.75,
          scale: 1,
          duration: 0.28,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.2',
      )
      // 발자국 사라지기
      .to(pawprints, {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        delay: 6,
        stagger: 0.1,
        ease: 'power2.out',
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* 모리 이미지 */}
      <div
        className="fixed z-[60] pointer-events-none select-none"
        style={{ bottom: 24, right: rightOffset }}
      >
        <img
          ref={imageRef}
          src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/easter_egg/mori.webp"
          alt=""
          className="w-80 h-80 object-contain drop-shadow-lg"
          draggable={false}
        />
      </div>

      {/* 발자국 */}
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            pawprintsRef.current[index] = el;
          }}
          className="fixed text-2xl z-[55] pointer-events-none select-none"
          style={{
            bottom: `${24 + index * 26}px`,
            right: `${rightOffset + 20 + index * 22}px`,
          }}
        >
          🐾
        </div>
      ))}
    </>
  );
};

export default Mori;
