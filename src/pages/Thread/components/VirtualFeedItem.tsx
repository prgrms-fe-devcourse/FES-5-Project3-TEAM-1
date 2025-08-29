import type { Feed } from '@/shared/types/feed';
import type { VirtualItem } from '@tanstack/react-virtual';
import FeedCard from './FeedCard';

interface Props {
  virtualItem: VirtualItem;
  measureElement: (node: Element | null | undefined) => void;
  feed: Feed;
  token: string;
}

const VirtualFeedItem = ({
  virtualItem,
  measureElement,
  feed,
  token,
}: Props) => {
  return (
    <div
      ref={measureElement}
      key={virtualItem.key}
      className="absolute top-0 left-0 w-full px-0 py-3"
      data-index={virtualItem.index}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: `translateY(${virtualItem.start}px)`,
      }}
    >
      {/* 실제 피드 컴포넌트 */}
      <FeedCard
        feedId={feed.id}
        token={token}
        nickname={feed.nickname}
        createdAt={feed.created_at}
      >
        {feed.content}
      </FeedCard>
    </div>
  );
};
export default VirtualFeedItem;
