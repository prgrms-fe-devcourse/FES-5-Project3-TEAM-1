import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const ConfettiComponent = () => {
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    const isMobile = window.innerWidth <= 600;

    const interval = setInterval(() => {
      if (isMobile) {
        confetti({
          particleCount: randomInRange(50, 100),
          spread: 70,
          origin: { y: 0.7, x: 0.5 },
        });
      } else {
        confetti({
          angle: 60,
          spread: 55,
          particleCount: randomInRange(50, 100),
          origin: { x: 0 },
        });

        confetti({
          angle: 120,
          spread: 55,
          particleCount: randomInRange(50, 100),
          origin: { x: 1 },
        });
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default ConfettiComponent;
