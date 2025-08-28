import { useEffect, useRef } from 'react';
import logoUrl from '@/assets/logo.png';

interface Props {
  children: React.ReactNode;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

const FeedList = ({ children, hasMore, isLoading, onLoadMore }: Props) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '0px' },
    );

    if (triggerRef.current) {
      observerRef.current.observe(triggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <ul className="flex flex-col gap-6 pt-6">
      {children}
      {hasMore && (
        <li ref={triggerRef} className="w-full flex-center py-20">
          <img src={logoUrl} />
        </li>
      )}
    </ul>
  );
};
export default FeedList;
