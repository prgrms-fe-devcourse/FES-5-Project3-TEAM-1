import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import VirtualFeedItem from './VirtualFeedItem';

import logoUrl from '@/assets/logo.png';
import type { Feed } from '@/shared/types/feed';
import { useFeedVirtualizer } from '../hooks/useFeedVirtualizer';

interface Props {
  feeds: Feed[];
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
  // 무한 스크롤 hook
  const triggerRef = useInfiniteScroll({ hasMore, isLoading, onLoadMore });

  // 버츄얼 hook
  const rowVirtualizer = useFeedVirtualizer({ feeds });

  return (
    <div className="flex flex-col py-3">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          return (
            <VirtualFeedItem
              feed={feeds[virtualItem.index]}
              measureElement={rowVirtualizer.measureElement}
              token={token}
              virtualItem={virtualItem}
              key={virtualItem.key}
            />
          );
        })}
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
