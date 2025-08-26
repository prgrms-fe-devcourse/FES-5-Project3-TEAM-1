import { uploadFeed } from '@/shared/api/feed';
import type { FeedType } from '@/shared/types/feed';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useState } from 'react';

interface Props {
  threadId: string;
  token: string;
  nickname?: string;
}

export const useFeedUpload = ({
  threadId,
  token,
  nickname = 'Nimo',
}: Props) => {
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<FeedType>('text');
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadFeed = async () => {
    if (!content.trim()) return;
    setIsUploading(true);
    try {
      await uploadFeed({
        threadId,
        token,
        content,
        nickname,
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
