import { memo } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';

import Card from '@/shared/components/feed-card/Card';
import { downloadImage } from '../../utils/file';
import TooltipButton from '@/shared/components/button/TooltipButton';

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
        <div className="flex relative justify-center px-10">
          {drawingUrl && (
            <>
              <div className="relative max-w-[80%]">
                <img
                  src={drawingUrl}
                  alt="사진"
                  className="h-auto"
                  loading="lazy"
                />
              </div>
              <div className="absolute right-0 -bottom-2 z-20">
                <TooltipButton
                  label="이미지 다운로드"
                  tooltip="이미지 다운로드"
                  onClick={() =>
                    downloadImage(drawingUrl.replace(/_400_\.png$/, '.png'))
                  }
                  className="flex-center w-7 h-7 text-gray-dark rounded-full transition-[background] duration-200 hover:bg-primary/30 active:bg-primary/30"
                >
                  <MdOutlineFileDownload size={24} aria-hidden="true" />
                </TooltipButton>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
export default memo(ImageFeed);
