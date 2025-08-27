import { useCallback, useEffect, useState, useTransition } from 'react';

import { createFeedsChannel, fetchFeeds } from '@/shared/api/feed';
import type { Tables } from '@/shared/types';
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';

export const useFeeds = (threadId: string) => {
  const [feeds, setFeeds] = useState<Tables<'feeds'>[]>([]);
  const [isPending, startTransition] = useTransition();

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    fetchInitialFeeds();
  }, []);

  const fetchInitialFeeds = () => {
    startTransition(async () => {
      if (!threadId || isInitialized) return;
      try {
        const result = await fetchFeeds({ threadId, page });
        setFeeds(result.data || []);
        setPage(1);
        setHasMore(result.hasMore);
        setIsInitialized(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`피드 초기 값 fetch error : ${error.message}`);
          setIsInitialized(true);
        }
      }
    });
  };

  const loadMore = useCallback(() => {
    if (isPending || !hasMore) return;
    startTransition(async () => {
      try {
        const nextPage = page + 1;
        const result = await fetchFeeds({
          threadId,
          page: nextPage,
        });

        if (result.data && result.data.length > 0) {
          setFeeds((prev) => [...prev, ...result.data!]);
          setPage(nextPage);
          setHasMore(result.hasMore);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Load more failed:', error);
      }
    });
  }, [threadId, page, isPending, hasMore]);

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
    hasMore,
    loadMore,
  };
};
