import { useCallback, useEffect, useRef, useState } from 'react';

import { createFeedsChannel, fetchFeedsWithRPC } from '@/shared/api/feed';
import type { Tables } from '@/shared/types';
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import type { FeedSortBy } from '@/shared/types/enum';
import type { Feed } from '@/shared/types/feed';

export const useFeeds = ({
  threadId,
  sortBy,
}: {
  threadId: string;
  sortBy: FeedSortBy;
}) => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const currentSortRef = useRef<FeedSortBy | null>(null);
  const isInitializedRef = useRef(false);

  // 피드 데이터 로딩 함수
  const loadFeeds = useCallback(
    async (reset = false) => {
      if (!threadId) return;

      setIsLoading(true);
      try {
        const targetPage = reset ? 0 : page;
        const result = await fetchFeedsWithRPC({
          threadId,
          page: targetPage,
          sortBy,
        });

        if (reset) {
          setFeeds(result.data || []);
          setPage(1);
        } else {
          setFeeds((prev) => [...prev, ...(result.data || [])]);
          setPage((prev) => prev + 1);
        }

        setHasMore(result.hasMore);
        currentSortRef.current = sortBy;
        isInitializedRef.current = true;
      } catch (error) {
        if (error instanceof Error) {
          console.error(`피드 fetch error: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [threadId, sortBy, page],
  );

  // 초기 로딩 및 정렬 변경 시 재로딩
  useEffect(() => {
    // 초기 로딩이거나 정렬 방식이 변경된 경우
    const shouldReset =
      !isInitializedRef.current || sortBy !== currentSortRef.current;
    if (shouldReset) {
      loadFeeds(true);
    }
  }, [threadId, sortBy, loadFeeds]);

  // 무한스크롤 로드모어
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    loadFeeds(false);
  }, [isLoading, hasMore, loadFeeds]);

  // 실시간 채널 구독
  useEffect(() => {
    if (!threadId) return;

    const channel = createFeedsChannel({
      threadId,
      onNewFeedInsert: handleUploadFeed,
      onFeedUpdate: handleUpdateFeed,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [threadId]);

  // 실시간 insert 감지 콜백 함수
  const handleUploadFeed = (
    payload: RealtimePostgresInsertPayload<Tables<'feeds'>>,
  ) => {
    const newFeed = payload.new;

    const feedWithReactions = {
      id: newFeed.id,
      thread_id: newFeed.thread_id,
      token: newFeed.token,
      nickname: newFeed.nickname,
      content: newFeed.content,
      created_at: newFeed.created_at,
      type: newFeed.type,
      comment_count: newFeed.comment_count,
      total_reactions: 0,
    };
    setFeeds((prev) => [feedWithReactions, ...prev]);
  };
  // 실시간 update 감지 콜백 함수
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
    isFetchFeedLoading: isLoading,
    feeds,
    hasMore,
    loadMore,
  };
};
