'use client';

import { useEffect, useRef } from 'react';

export const Lighter = () => {
  const lighterRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lighterRef.current) return;

      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        lighterRef.current!.style.background = `
          radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(6,182,212,0.12), transparent 80%)
        `;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={lighterRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
};
