// Panel01.tsx
import { forwardRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PanelProps {
  className?: string;
}

const Panel01 = forwardRef<HTMLDivElement, PanelProps>(({ className }, ref) => {
  useLayoutEffect(() => {
    const container = (ref as React.RefObject<HTMLDivElement>)?.current;
    if (!container) return;

    const createEmojiExplosion = () => {
      const textEl = container.querySelector<HTMLElement>('h2');
      if (!textEl) return;

      const rect = textEl.getBoundingClientRect();
      const startX = rect.left + rect.width / 2 + window.scrollX;
      const startY = rect.top + rect.height / 2 + window.scrollY;

      const emojis = ['❤️', '😊', '🫥', '😍', '🤯', '✨', '🌟', '🎉'];
      const count = 12;

      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = 'absolute';
        el.style.left = `${startX}px`;
        el.style.top = `${startY}px`;
        el.style.fontSize = `${Math.random() * 20 + 20}px`;
        el.style.pointerEvents = 'none';
        el.style.textShadow = `0 0 ${Math.random() * 10 + 5}px #fff`;
        container.appendChild(el);

        const animate = () => {
          gsap.set(el, { x: 0, y: 0, opacity: 1, rotation: 0 });
          gsap.to(el, {
            x: Math.random() * 120 - 60,
            y: Math.random() * -200,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            onComplete: animate,
          });
        };

        animate();
      }
    };

    ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      onEnter: createEmojiExplosion,
      onEnterBack: createEmojiExplosion,
    });
  }, [ref]);

  return (
    <div ref={ref} className={className}>
      <h2 className="text-4xl text-black">이모지로 표현하고</h2>
    </div>
  );
});

export default Panel01;
