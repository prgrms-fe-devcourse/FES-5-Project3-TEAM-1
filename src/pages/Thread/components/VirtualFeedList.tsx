import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import VirtualFeedItem from './VirtualFeedItem';

import logoUrl from '@/assets/logo.png';
import { useFeedVirtualizer } from '../hooks/useFeedVirtualizer';
import { useFeedStore } from '../utils/store';
import EmptyFeed from './feed/EmptyFeed';

interface Props {
  token: string;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

const VirtualFeedList = ({ token, hasMore, isLoading, onLoadMore }: Props) => {
  // 무한 스크롤 hook
  const triggerRef = useInfiniteScroll({ hasMore, isLoading, onLoadMore });

  // 버츄얼 hook
  const feedIds = useFeedStore((state) => state.feedIds);
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
                token={token}
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
