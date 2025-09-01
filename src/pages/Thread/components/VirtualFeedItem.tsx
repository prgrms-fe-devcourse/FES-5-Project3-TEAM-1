import { Virtualizer, type VirtualItem } from '@tanstack/react-virtual';
import Card from '@/shared/components/feed-card/Card';
import ImageFeed from './feed/ImageFeed';
import { useFeedStore } from '../utils/store';

interface Props {
  virtualItem: VirtualItem;
  feedId: string;
  rowVirtualizer: Virtualizer<Window, Element>;
}

const VirtualFeedItem = ({ rowVirtualizer, virtualItem, feedId }: Props) => {
  const feed = useFeedStore((state) => state.feedById[feedId]);
  return (
    // 가상 아이템 위치 크기 계산
    <div
      ref={rowVirtualizer.measureElement}
      key={virtualItem.key}
      className="absolute top-0 left-0 w-full px-0 py-2"
      data-index={virtualItem.index}
      style={{
        transform: `translateY(${virtualItem.start}px)`,
      }}
    >
      {/* 실제 피드 컴포넌트 */}
      {feed.type === 'text' ? (
        <Card
          feedId={feed.id}
          content={feed.content}
          nickname={feed.nickname}
          createdAt={feed.created_at}
          commentCount={feed.comment_count}
        />
      ) : (
        <ImageFeed
          feedId={feed.id}
          content={feed.content}
          nickname={feed.nickname}
          createdAt={feed.created_at}
          commentCount={feed.comment_count}
          drawingUrl={feed.drawing_url || ''}
        />
      )}
    </div>
  );
};
export default VirtualFeedItem;
