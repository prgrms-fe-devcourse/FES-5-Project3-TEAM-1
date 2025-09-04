import { useEffect, useState } from 'react';
import { GoChevronUp } from 'react-icons/go';

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 md:bottom-10 right-5 md:right-10 w-10 h-10 bg-primary-light hover:bg-primary 
                     border border-gray-200 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.25)] 
                     flex items-center justify-center
                     transition-all duration-200 hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-primary z-50"
      aria-label="맨 위로 이동"
    >
      <GoChevronUp size={20} className="text-gray-700" />
    </button>
  );
};
export default ScrollUpButton;
