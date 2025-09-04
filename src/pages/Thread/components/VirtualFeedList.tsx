import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import VirtualFeedItem from './VirtualFeedItem';

import logoUrl from '@/assets/logo.png';
import { useFeedVirtualizer } from '../hooks/useFeedVirtualizer';
import { useFeedStore } from '../utils/store';
import EmptyFeed from './feed/EmptyFeed';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
  isInitialLoading: boolean;
}

const VirtualFeedList = ({
  hasMore,
  isLoading,
  onLoadMore,
  isInitialLoading,
}: Props) => {
  // 조건 부 렌더링
  if (isInitialLoading) {
    return (
      <div className="flex-center py-8 lg:py-20">
        <img
          className="animate-spin"
          width={100}
          height={100}
          src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/nimo_loading.webp"
          alt=""
          loading="eager"
        />
        <span>Loading...</span>
      </div>
    );
  }

  // 무한 스크롤 hook
  const triggerRef = useInfiniteScroll({ hasMore, isLoading, onLoadMore });

  const feedIds = useFeedStore((state) => state.feedIds);
  // virtual hook
  const rowVirtualizer = useFeedVirtualizer({ feedIds });
  const virtualItems = rowVirtualizer.getVirtualItems();
  const listContainerRef = useRef<HTMLDivElement>(null);
  const animationPlayed = useRef(false);

  useEffect(() => {
    // 정렬 변경 시 애니메이션 다시 재생
    if (isInitialLoading) {
      animationPlayed.current = false;
    }

    // 초기 로딩이 끝나고 랜더링할 아이템이 있을때 애니메이션
    if (
      !isInitialLoading &&
      virtualItems.length > 0 &&
      listContainerRef.current &&
      !animationPlayed.current
    ) {
      const feedItems =
        listContainerRef.current.querySelectorAll('.feed-item-inner');
      if (feedItems.length > 0) {
        const animateItems = Array.from(feedItems).slice(0, 10);

        gsap.from(animateItems, {
          duration: 0.8,
          opacity: 0,
          y: 20,
          stagger: 0.1,
          ease: 'power2.out',
        });
        animationPlayed.current = true;
      }
    }
  }, [isInitialLoading, virtualItems.length]);

  return (
    <div className="flex flex-col">
      <div
        ref={listContainerRef}
        style={{
          height: `${rowVirtualizer.getTotalSize() || 100}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {feedIds.length > 0 ? (
          <>
            {virtualItems.map((virtualItem) => (
              <VirtualFeedItem
                feedId={feedIds[virtualItem.index]}
                rowVirtualizer={rowVirtualizer}
                virtualItem={virtualItem}
                key={virtualItem.key}
              />
            ))}
          </>
        ) : (
          <EmptyFeed />
        )}
      </div>
      {/* 무한 스크롤 트리거 */}
      {hasMore && (
        <div ref={triggerRef} className="w-full flex justify-center py-10">
          {isLoading ? <img src={logoUrl} alt="" /> : <div className="h-10" />}
        </div>
      )}
    </div>
  );
};

export default VirtualFeedList;
