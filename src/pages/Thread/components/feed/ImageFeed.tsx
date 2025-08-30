import Card from '@/shared/components/feed-card/Card';

interface ImageCardProps {
  feedId: string;
  nickname: string;
  commentCount: number;
  createdAt: string;
  drawingUrl: string;
  content: string;
  className?: string;
}

export const ImageFeed = ({
  feedId,
  nickname,
  createdAt,
  content,
  className,
  drawingUrl,
  commentCount,
}: ImageCardProps) => {
  return (
    <Card
      className={className}
      nickname={nickname}
      createdAt={createdAt ? new Date(createdAt).toLocaleString() : ''}
      commentCount={commentCount}
      feedId={feedId}
      content={content}
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
