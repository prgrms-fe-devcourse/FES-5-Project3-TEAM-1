import { useEffect, useState, useTransition } from 'react';

import { createFeedsChannel, fetchFeeds } from '@/shared/api/feed';
import type { Tables } from '@/shared/types';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

export const useFeeds = (threadId: string) => {
  const [feeds, setFeeds] = useState<Tables<'feeds'>[]>();
  const [isPending, startTransition] = useTransition();

  // 초기 피드 리스트
  useEffect(() => {
    startTransition(async () => {
      try {
        const date = await fetchFeeds(threadId);
        setFeeds(date);
      } catch (error) {}
    });
  }, [threadId]);

  useEffect(() => {
    const channel = createFeedsChannel({
      threadId: threadId,
      onNewFeedInsert: handleUploadFeed,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [threadId]);

  const handleUploadFeed = (
    payload: RealtimePostgresInsertPayload<Tables<'feeds'>>,
  ) => {
    const updated = payload.new;
    setFeeds((prev) => [updated, ...prev!]);
  };

  return {
    isFetchFeedLoading: isPending,
    feeds,
  };
};
