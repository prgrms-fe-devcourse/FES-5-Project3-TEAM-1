import {
  createCommentsChannel,
  getCommentByFeedId,
  postComment,
  type CommentType,
} from '@/shared/api/comment';
import { useCallback, useEffect, useState } from 'react';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import type { Tables } from '@/shared/types';

export function useComment(feedId: string, token: string) {
  const [comment, setComment] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInsert = useCallback(
    (payload: RealtimePostgresInsertPayload<Tables<'comment'>>) => {
      const newComment = payload.new as CommentType;
      setComment((prev) => {
        if (prev.some((c) => c.id === newComment.id)) return prev;
        return [newComment, ...prev];
      });
    },
    [],
  );

  useEffect(() => {
    if (!feedId) return;

    const channel = createCommentsChannel(feedId, handleInsert);
    return () => {
      channel.unsubscribe();
    };
  }, [feedId, handleInsert]);

  // 댓글 작성
  const addComment = async (content: string, nickname: string) => {
    if (!content.trim()) return;
    try {
      const data = await postComment({
        feed_id: feedId,
        content,
        nickname,
        token,
      });
      setComment((prev) =>
        prev.some((c) => c.id === data.id) ? prev : [data, ...prev],
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return { comment, addComment, isLoading };
}
