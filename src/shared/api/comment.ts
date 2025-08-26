import supabase from '../libs/supabase';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import type { Tables } from '../types';

export type CommentType = {
  id: string;
  feed_id: string;
  nickname: string;
  content: string;
  created_at: string | null;
};

/**
 *
 * 특정 피드의 댓글 가져오기
 */
export async function getCommentByFeedId(
  feedId: string,
): Promise<CommentType[]> {
  const { data, error } = await supabase
    .from('comment')
    .select('id, feed_id, nickname, content, created_at')
    .eq('feed_id', feedId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(
      `해당 피드의 댓글을 불러오는데 실패했습니다. feed id : ${feedId}`,
    );
  }
  return data;
}

/**
 * 새로운 댓글 등록
 */
export async function postComment(params: {
  feed_id: string;
  nickname: string;
  content: string;
  token: string;
}): Promise<CommentType> {
  const { feed_id, nickname, content, token } = params;

  const { data, error } = await supabase
    .from('comment')
    .insert({ feed_id, nickname, content, token })
    .select('id, feed_id, nickname, content, created_at')
    .single();

  if (error) {
    console.error(error);
    throw new Error(`댓글 게시에 실패했습니다. feed id : ${feed_id}`);
  }
  if (!data) {
    throw new Error('댓글 게시 후 데이터를 반환받지 못했습니다.');
  }
  return data;
}

/**
 * 댓글 테이블 구독
 */
export const createCommentsChannel = (
  feedId: string,
  onNewComment: (
    payload: RealtimePostgresInsertPayload<Tables<'comment'>>,
  ) => void,
) => {
  return supabase
    .channel(`comments_for_feed_${feedId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comment',
        filter: `feed_id=eq.${feedId}`,
      },
      onNewComment,
    )
    .subscribe();
};
