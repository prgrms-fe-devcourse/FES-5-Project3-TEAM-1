import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import logoUrl from '@/assets/logo.png';
import type { Tables } from '@/shared/types';
import FeedCard from './FeedCard';

interface Props {
  feeds: Tables<'feeds'>[];
  token: string;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

const VirtualFeedList = ({
  feeds,
  token,
  hasMore,
  isLoading,
  onLoadMore,
}: Props) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: feeds.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 180,
    measureElement: (element) => {
      return element?.getBoundingClientRect().height ?? 180;
    },
    overscan: 5,
  });

  // 무한 스크롤 observer
  useEffect(() => {
    if (!hasMore || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: containerRef.current,
        rootMargin: '200px',
      },
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
    <div ref={containerRef} className="h-[80vh] overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const feed = feeds[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              className="absolute top-0 left-0 w-full px-0"
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {/* 실제 피드 컴포넌트 */}
              <div className="py-3">
                <FeedCard
                  feedId={feed.id}
                  token={token}
                  nickname={feed.nickname}
                  createdAt={feed.created_at}
                >
                  {feed.content}
                </FeedCard>
              </div>
            </div>
          );
        })}
      </div>

      {/* 무한 스크롤 트리거 */}
      {hasMore && (
        <div ref={triggerRef} className="w-full flex justify-center py-20">
          {isLoading ? <img src={logoUrl} alt="" /> : <div className="h-10" />}
        </div>
      )}
    </div>
  );
};

export default VirtualFeedList;
