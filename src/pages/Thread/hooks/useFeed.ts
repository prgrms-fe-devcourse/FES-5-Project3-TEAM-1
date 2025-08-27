import { useEffect, useMemo, useState, useTransition } from 'react';

import { createFeedsChannel, fetchFeeds } from '@/shared/api/feed';
import type { Tables } from '@/shared/types';
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import { fetchEmojis } from '@/shared/api/emoji';
import { sortByComments, sortByLatest } from '../utils/sortFeeds';

export const useFeeds = (threadId: string) => {
  const [feeds, setFeeds] = useState<Tables<'feeds'>[]>();
  const [isPending, startTransition] = useTransition();
  const [emojis, setEmojis] = useState<Tables<'emoji_counts'>[]>();
  const [sortBy, setSortBy] = useState<'latest' | 'comments' | 'reactions'>(
    'latest',
  );

  // 초기 피드 리스트
  useEffect(() => {
    startTransition(async () => {
      try {
        const date = await fetchFeeds(threadId);
        setFeeds(date);
        const emojiData = await fetchEmojis();
        setEmojis(emojiData);
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

  const reactionCountMap = useMemo(() => {
    if (!emojis) return new Map<string, number>();
    return emojis.reduce((map, e) => {
      map.set(e.feed_id, (map.get(e.feed_id) || 0) + 1);
      return map;
    }, new Map<string, number>());
  }, [emojis]);

  const sortFeeds = (
    feeds: Tables<'feeds'>[],
    sortBy: 'latest' | 'comments' | 'reactions',
  ) => {
    if (sortBy === 'latest') {
      return [...feeds].sort(sortByLatest);
    } else if (sortBy === 'comments') {
      return [...feeds].sort(sortByComments);
    } else if (sortBy === 'reactions') {
      return [...feeds].sort((a, b) => {
        const aCount = reactionCountMap.get(a.id) ?? 0;
        const bCount = reactionCountMap.get(b.id) ?? 0;
        return bCount - aCount;
      });
    } else return feeds;
  };

  const sortedFeeds = useMemo(() => {
    if (!feeds) return [];
    return sortFeeds(feeds, sortBy);
  }, [feeds, sortBy]);

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
    feeds: sortedFeeds,
    setSortBy,
  };
};
