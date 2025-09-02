import Card from '@/shared/components/feed-card/Card';
import { memo } from 'react';

interface ImageCardProps {
  feedId: string;
  nickname: string;
  commentCount: number;
  createdAt: string;
  drawingUrl: string;
  content: string;
  isExpanded: boolean;
  className?: string;
}

const ImageFeed = ({
  feedId,
  nickname,
  createdAt,
  content,
  className,
  drawingUrl,
  isExpanded,
  commentCount,
}: ImageCardProps) => {
  return (
    <Card
      className={className}
      nickname={nickname}
      createdAt={createdAt}
      commentCount={commentCount}
      feedId={feedId}
      content={content}
      isExpanded={isExpanded}
    >
      <div className="px-5 pb-3 before:block before:h-[2px] before:bg-gray-light before:mb-3">
        <div className="flex justify-center px-10">
          <img
            src={drawingUrl}
            alt="그린 그림"
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>
    </Card>
  );
};

export default memo(ImageFeed);
