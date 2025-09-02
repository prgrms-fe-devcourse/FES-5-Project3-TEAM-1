'use client';

import { useEffect, useState } from 'react';

export const Lighter = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const style = {
    background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), transparent 80%)`,
    // background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), transparent 80%)`,
    // background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(251, 146, 60, 0.1), transparent 80%)`,
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] transition duration-300"
      style={style}
    />
  );
};
