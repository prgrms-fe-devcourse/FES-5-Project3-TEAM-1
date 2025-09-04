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
        <div className="flex justify-center px-10">
          {drawingUrl && (
            <div className="relative max-w-[80%] group/overlay">
              <img
                src={drawingUrl}
                alt="사진"
                className="h-auto "
                loading="lazy"
              />
              <div className="absolute inset-0 flex justify-end p-4 items-end bg-black/0 group-hover/overlay:bg-black/20 transition-all duration-300">
                <TooltipButton
                  label="이미지 다운로드"
                  tooltip="이미지 다운로드"
                  className="opacity-0  group-hover/overlay:opacity-100 text-white transition-all duration-200 active:scale-95"
                  aria-label="이미지 다운로드"
                  onClick={() => downloadImage(drawingUrl)}
                >
                  <MdOutlineFileDownload size={25} aria-hidden="true" />
                </TooltipButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
export default memo(ImageFeed);
