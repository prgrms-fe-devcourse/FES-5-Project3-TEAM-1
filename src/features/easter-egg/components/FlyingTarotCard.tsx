import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TarotCard from '@/assets/tarot_back.svg?react';

const FlyingTarotCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const tl = gsap.timeline({ repeat: -1 });

    gsap.set(card, {
      x: -150,
      y: window.innerHeight * 0.8,
      rotation: 0,
      scale: 0.8,
    });

    // 5초 동안의 S자 곡선 동선
    tl.to(card, {
      x: window.innerWidth * 0.3,
      y: window.innerHeight * 0.2,
      rotation: 180,
      scale: 1.1,
      duration: 1.8,
      ease: 'power2.out',
    })
      .to(card, {
        x: window.innerWidth * 0.7,
        y: window.innerHeight * 0.6,
        rotation: 360,
        scale: 0.9,
        duration: 1.7,
        ease: 'power1.inOut',
      })
      .to(card, {
        x: window.innerWidth + 150,
        y: window.innerHeight * 0.1,
        rotation: 540,
        scale: 1.2,
        duration: 1.5,
        ease: 'power2.in',
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div
        ref={cardRef}
        className="absolute"
        style={{
          filter: 'drop-shadow(0 8px 16px rgba(147, 51, 234, 0.5))',
        }}
      >
        <TarotCard />
      </div>
    </div>
  );
};

export default FlyingTarotCard;
