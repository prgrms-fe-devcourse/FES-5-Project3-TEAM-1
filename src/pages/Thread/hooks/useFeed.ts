import { useEffect, useState, useTransition } from 'react';

import { createFeedsChannel, fetchFeeds } from '@/shared/api/feed';
import type { Tables } from '@/shared/types';
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';

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
      onFeedUpdate: handleUpdateFeed,
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

  const handleUpdateFeed = (
    payload: RealtimePostgresUpdatePayload<Tables<'feeds'>>,
  ) => {
    const updated = payload.new;
    setFeeds((prev) => {
      const updatedId = updated.id;
      return prev?.map((feed) =>
        feed.id === updatedId
          ? { ...feed, comment_count: updated.comment_count }
          : feed,
      );
    });
  };

  return {
    isFetchFeedLoading: isPending,
    feeds,
  };
};
