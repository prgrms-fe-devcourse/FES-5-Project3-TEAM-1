import { useRef, useState } from 'react';

import type { CanvasRefHandle } from '@/features/drawing/types/drawing';
import type { FeedType } from '@/shared/types/feed';
import { uploadDrawing } from '@/features/drawing/api/drawing';
import { uploadFeed } from '@/shared/api/feed';
import { useThrottle } from '@/shared/hook/useThrottle';
import { getNicknameFromSession } from '@/shared/utils/nickname';
import { toastUtils } from '@/shared/utils/toastUtils';
import { insertTriggerEvent } from '@/shared/api/easter-egg';
import { checkTriggerWord } from '@/features/easter-egg/utils/trigger';

interface Props {
  threadId: string;
  token: string;
}

const TRIGGER_COOLDOWN = 5000;

export const useFeedUpload = ({ threadId, token }: Props) => {
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<FeedType>('text');
  const [isUploading, setIsUploading] = useState(false);
  const drawingRef = useRef<CanvasRefHandle>(null);

  // 이스터 에그 업로드
  const throttleInsertTrigger = useThrottle(async (word: string) => {
    await insertTriggerEvent({ threadId, word });
  }, TRIGGER_COOLDOWN);

  const handleInsertTriggerWord = (word: string) => {
    try {
      throttleInsertTrigger(word);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

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

      // let drawingUrl: string | undefined;
      if (lastType === 'drawing' && blob) {
        // drawingUrl = await uploadDrawing({ feedId, file: blob });
        await uploadDrawing({ feedId, file: blob });
      }

      // 이스터 에그
      const word = checkTriggerWord(content);
      if (word) {
        handleInsertTriggerWord(word);
      }

      setContent('');

      // return { feedId, drawingUrl };
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
    type,
  };
};
