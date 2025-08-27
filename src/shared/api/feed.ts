import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import supabase from '../libs/supabase';
import type { FeedType } from '../types/feed';
import type { Tables } from '../types';

interface UploadFeedProps {
  threadId: string;
  content: string;
  nickname: string;
  token: string;
  type: FeedType;
}

/**
 * 피드 업로드
 */
export const uploadFeed = async ({
  threadId,
  content,
  nickname,
  token,
  type,
}: UploadFeedProps) => {
  const { error } = await supabase
    .from('feeds')
    .insert({ thread_id: threadId, nickname, token, type, content });

  if (error) {
    throw new Error(
      `feed upload error - thread_id : ${threadId} , token: ${token} error message : ${error}`,
    );
  }
};

/**
 * 피드 테이블 구독
 */
export const createFeedsChannel = ({
  threadId,
  onNewFeedInsert,
  onFeedUpdate,
}: {
  threadId: string;
  onNewFeedInsert: (
    payload: RealtimePostgresInsertPayload<Tables<'feeds'>>,
  ) => void;
  onFeedUpdate: (
    payload: RealtimePostgresUpdatePayload<Tables<'feeds'>>,
  ) => void;
}) => {
  return supabase
    .channel(`feeds_${threadId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'feeds',
        filter: `thread_id=eq.${threadId}`,
      },
      onNewFeedInsert,
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'feeds',
        filter: `thread_id=eq.${threadId}`,
      },
      onFeedUpdate,
    )
    .subscribe();
};

export const fetchFeeds = async (
  threadId: string,
): Promise<Tables<'feeds'>[]> => {
  const { data, error } = await supabase
    .from('feeds')
    .select()
    .eq('thread_id', threadId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`fetchFeeds error : ${error}`);
    throw new Error(`fetch feeds error`);
  }

  return data;
};
