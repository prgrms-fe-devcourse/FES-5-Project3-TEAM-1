import { useCallback, useEffect, useState } from 'react';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

import {
  createCommentsChannel,
  getCommentByFeedId,
  postComment,
  type CommentType,
} from '@/shared/api/comment';
import { getBrowserTokenFromLocalStorage } from '@/shared/utils/token';

export function useComment(feedId: string) {
  const [comment, setComment] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInsert = useCallback(
    (payload: RealtimePostgresInsertPayload<CommentType>) => {
      const newComment = payload.new as CommentType;
      setComment((prev) => {
        if (prev.some((c) => c.id === newComment.id)) return prev;
        return [newComment, ...prev];
      });
    },
    [],
  );

  //초기 댓글 목록
  useEffect(() => {
    if (!feedId) return;
    (async () => {
      setIsLoading(true);
      try {
        const data = await getCommentByFeedId(feedId);
        setComment(data ?? []);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [feedId]);

  useEffect(() => {
    if (!feedId) return;

    const channel = createCommentsChannel(feedId, handleInsert);
    return () => {
      channel.unsubscribe();
    };
  }, [feedId, handleInsert]);

  // 댓글 작성
  const addComment = useCallback(
    async (content: string, nickname: string): Promise<boolean> => {
      if (!content.trim()) return false;
      const myToken = getBrowserTokenFromLocalStorage();
      if (!myToken) return false;
      try {
        const date = await postComment({
          feed_id: feedId,
          content,
          nickname,
          token: myToken,
        });
        setComment((prev) => {
          if (prev.some((c) => c.id === date.id)) return prev;
          return [date, ...prev];
        });
        return true;
      } catch (error) {
        console.error(
          '댓글 작성 오류:',
          error instanceof Error ? error.message : error,
        );
        return false;
      }
    },
    [feedId],
  );

  return { comment, addComment, isLoading: isLoading };
}
