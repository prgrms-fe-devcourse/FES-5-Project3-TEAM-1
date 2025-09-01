import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import VirtualFeedItem from './VirtualFeedItem';

import logoUrl from '@/assets/logo.png';
import { useFeedVirtualizer } from '../hooks/useFeedVirtualizer';
import { useFeedStore } from '../utils/store';
import EmptyFeed from './feed/EmptyFeed';

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

  return (
    <div className="flex flex-col py-3">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {feedIds.length > 0 ? (
          <>
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
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
