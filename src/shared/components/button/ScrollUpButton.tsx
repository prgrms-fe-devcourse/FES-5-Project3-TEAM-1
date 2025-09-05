import { useEffect, useState, useCallback } from 'react';
import { GoChevronUp } from 'react-icons/go';

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // useCallback으로 함수 최적화
  const toggleVisibility = useCallback(() => {
    // window.pageYOffset 대신 window.scrollY 사용 (더 표준적)
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;

    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    // passive: true 옵션으로 성능 향상
    const options = { passive: true };

    window.addEventListener('scroll', toggleVisibility, options);

    // 초기 상태 설정
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
