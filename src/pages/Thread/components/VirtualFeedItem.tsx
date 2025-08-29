import type { Feed } from '@/shared/types/feed';
import { Virtualizer, type VirtualItem } from '@tanstack/react-virtual';
import FeedCard from './FeedCard';

interface Props {
  virtualItem: VirtualItem;
  feed: Feed;
  token: string;
  rowVirtualizer: Virtualizer<Window, Element>;
}

const VirtualFeedItem = ({
  rowVirtualizer,
  virtualItem,
  feed,
  token,
}: Props) => {
  return (
    <div
      ref={rowVirtualizer.measureElement}
      key={virtualItem.key}
      className="absolute top-0 left-0 w-full px-0 py-2"
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
        commentCount={feed.comment_count}
        feedExtraContent={
          feed.type === 'drawing' && feed.drawing_url ? (
            <div className="flex justify-center px-10">
              <img
                src={feed.drawing_url}
                alt="그린 그림"
                className="w-full"
                loading="lazy"
              />
            </div>
          ) : null
        }
      >
        {feed.content}
      </FeedCard>
    </div>
  );
};
export default VirtualFeedItem;
