import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';

import { createFeedsChannel, fetchFeedsWithRPC } from '@/shared/api/feed';
import type { Tables } from '@/shared/types';
import type { FeedSortBy } from '@/shared/types/enum';
import type { Feed } from '@/shared/types/feed';

import { useFeedStore } from '../utils/store';

export const useFeeds = ({
  threadId,
  sortBy,
}: {
  threadId: string;
  sortBy: FeedSortBy;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const currentSortRef = useRef<FeedSortBy | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const isInitializedRef = useRef(false);

  // 피드 스토어
  const setFeeds = useFeedStore((state) => state.setFeeds);
  const addFeed = useFeedStore((state) => state.addFeed);
  const updateFeed = useFeedStore((state) => state.updateFeed);

  // 에스터 에그

  // 피드 데이터 로딩 함수
  const loadFeeds = useCallback(
    async (isInitialFetch = false) => {
      if (!threadId) return;
      setIsLoading(true);

      try {
        const result = await fetchFeedsWithRPC({
          threadId,
          page: isInitialFetch ? 0 : page,
          sortBy,
        });

        // 스토어 저장
        setFeeds(result.data, isInitialFetch);

        setPage((prev) => (isInitialFetch ? 1 : prev + 1));

        setHasMore(result.hasMore);

        currentSortRef.current = sortBy;
        isInitializedRef.current = true;
      } catch (error) {
        if (error instanceof Error) {
          console.error(`피드 fetch error: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
        setIsInitialLoading(false);
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
      setIsInitialLoading(true);
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
    const newFeed = payload.new as Feed;
    addFeed(newFeed);
  };

  // 실시간 update 감지 콜백 함수
  const handleUpdateFeed = (
    payload: RealtimePostgresUpdatePayload<Tables<'feeds'>>,
  ) => {
    const updatedFeed = payload.new as Feed;
    updateFeed(updatedFeed);
  };

  return {
    hasMore,
    loadMore,
    isFetchFeedLoading: isLoading,
    isInitialLoading,
  };
};
