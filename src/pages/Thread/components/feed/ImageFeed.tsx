import { memo } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';

import Card from '@/shared/components/feed-card/Card';
import { downloadImage } from '../../utils/file';
import TooltipButton from '@/shared/components/button/TooltipButton';
import type { FeedWithIsExpanded } from '../../utils/store';

interface ImageCardProps {
  feed: FeedWithIsExpanded;
}
const ImageFeed = ({ feed }: ImageCardProps) => {
  const { drawing_url: drawingUrl } = feed;
  return (
    <Card feed={feed}>
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
              <div className="absolute right-0 -bottom-2 z-20 transition-opacity duration-500">
                <TooltipButton
                  label="이미지 다운로드"
                  tooltip="이미지 다운로드"
                  onClick={() =>
                    downloadImage(drawingUrl.replace(/_400_(?=\.[^.]+$)/, ''))
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
