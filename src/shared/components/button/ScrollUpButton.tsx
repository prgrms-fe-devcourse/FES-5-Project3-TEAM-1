import { useEffect, useState, useCallback } from 'react';
import { GoChevronUp } from 'react-icons/go';

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 최적화
  const toggleVisibility = useCallback(() => {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY || 0;
      setIsVisible(scrollY > 100);
    });
  }, []);

  // 스크롤
  const scrollToTop = useCallback(() => {
    const start = window.scrollY;
    const duration = 500; // 애니메이션 시간 (ms)
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  useEffect(() => {
    const options = { passive: true };
    window.addEventListener('scroll', toggleVisibility, options);

    // 초기 상태
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 md:bottom-10 right-6 md:right-10 
                 w-12 h-12 md:w-10 md:h-10 
                 bg-primary-light hover:bg-primary
                 border border-gray-200 rounded-full 
                 shadow-[0_1px_4px_rgba(0,0,0,0.25)]
                 flex items-center justify-center
                 transition-all duration-200 hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-primary 
                 z-[9999]
                 active:scale-95"
      aria-label="맨 위로 이동"
      type="button"
    >
      <GoChevronUp size={20} className="text-gray-700" />
    </button>
  );
};

export default ScrollUpButton;
