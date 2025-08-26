import { uploadFeed } from '@/shared/api/feed';
import type { FeedType } from '@/shared/types/feed';
import { getNicknameFromSession } from '@/shared/utils/nickname';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useState } from 'react';

interface Props {
  threadId: string;
  token: string;
}

export const useFeedUpload = ({ threadId, token }: Props) => {
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<FeedType>('text');
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadFeed = async () => {
    const nickname = getNicknameFromSession();
    if (!content.trim()) return;
    setIsUploading(true);
    try {
      await uploadFeed({
        threadId,
        token,
        content,
        nickname: nickname ?? 'nimo',
        type,
      });

      setContent('');
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
    onSubmit: handleUploadFeed,
    isUploading: isUploading,
  };
};
