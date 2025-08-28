import { uploadDrawing } from '@/features/drawing/api/drawing';
import type { CanvasRefHandle } from '@/features/drawing/types/drawing';
import { uploadFeed } from '@/shared/api/feed';
import type { FeedType } from '@/shared/types/feed';
import { getNicknameFromSession } from '@/shared/utils/nickname';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useRef, useState } from 'react';

interface Props {
  threadId: string;
  token: string;
}

export const useFeedUpload = ({ threadId, token }: Props) => {
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<FeedType>('text');
  const [isUploading, setIsUploading] = useState(false);
  const drawingRef = useRef<CanvasRefHandle>(null);

  const handleUploadFeed = async () => {
    const nickname = getNicknameFromSession();
    if (type !== 'drawing' && !content.trim()) return;

    setIsUploading(true);
    try {
      let lastType = type;
      let blob: Blob | null = null;

      if (type === 'drawing') {
        if (!drawingRef.current || drawingRef.current.isEmpty()) {
          lastType = 'text';
        } else {
          blob = await drawingRef.current.changeToBlob();
        }
      }

      const feedData = await uploadFeed({
        threadId,
        token,
        content,
        nickname: nickname ?? 'nimo',
        type: lastType,
      });

      const feedId = feedData?.id;
      if (!feedId) throw new Error('feed id를 못가져옴');

      let drawingUrl: string | undefined;
      if (lastType === 'drawing' && blob) {
        drawingUrl = await uploadDrawing({ feedId, file: blob });
      }
      console.log('Feed type:', lastType);

      setContent('');

      return { feedId, drawingUrl };
    } catch (error) {
      if (error instanceof Error) {
        toastUtils.error(error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    content,
    setContent,
    setType,
    drawingRef,
    onSubmit: handleUploadFeed,
    isUploading: isUploading,
  };
};
