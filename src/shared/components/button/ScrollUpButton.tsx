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
      className="fixed bottom-6 right-6 w-10 h-10 bg-white hover:bg-gray-50 
                     border border-gray-200 rounded-full shadow-lg 
                     flex items-center justify-center
                     transition-all duration-200 hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-yellow z-50"
      aria-label="맨 위로 이동"
    >
      <GoChevronUp size={20} className="text-gray-700" />
    </button>
  );
};
export default ScrollUpButton;
