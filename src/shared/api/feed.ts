import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import supabase from '../libs/supabase';
import type { Feed, FeedType } from '../types/feed';
import type { Tables } from '../types';
import { FEED_SORT_BY, type FeedSortBy } from '../types/enum';
import { getOrderConfig, SORT_CONFIG } from '../utils/feed';

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
  const { data, error } = await supabase
    .from('feeds')
    .insert({ thread_id: threadId, nickname, token, type, content })
    .select();

  if (error) {
    throw new Error(
      `feed upload error - thread_id : ${threadId} , token: ${token} error message : ${error}`,
    );
  }

  return data?.[0];
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

interface FetchFeedsProps {
  threadId: string;
  page: number;
  limit?: number;
  sortBy?: FeedSortBy;
}
/**
 * 피드 불러오기
 */
export const fetchFeeds = async ({
  threadId,
  page = 0,
  limit = 5,
  sortBy = FEED_SORT_BY.LATEST,
}: FetchFeedsProps): Promise<{ data: Tables<'feeds'>[]; hasMore: boolean }> => {
  const from = page * limit;
  const to = from + limit - 1;
  const orderConfig = getOrderConfig(sortBy);

  console.log('orderConfig', orderConfig);

  const { data, error } = await supabase
    .from('feeds')
    .select('*')
    .eq('thread_id', threadId)
    .order(orderConfig.column, { ascending: orderConfig.ascending })
    .range(from, to);

  if (error) {
    console.error(`fetchFeeds error : ${error}`);
    throw new Error(`fetch feeds error`);
  }

  return { data, hasMore: data?.length === limit };
};

export const fetchFeedsWithRPC = async ({
  threadId,
  page = 0,
  limit = 5,
  sortBy = FEED_SORT_BY.LATEST,
}: FetchFeedsProps): Promise<{ data: Feed[]; hasMore: boolean }> => {
  const sortConfig = SORT_CONFIG[sortBy];

  const { data, error } = await supabase.rpc('get_feeds_with_reaction_totals', {
    p_thread_id: threadId,
    p_limit: limit,
    p_offset: page * limit,
    p_order_by: sortConfig.order_by,
    p_order_desc: sortConfig.order_desc,
  });

  if (error) {
    console.error(`fetchFeeds error : ${error}`);
    throw new Error(`fetch feeds error`);
  }

  return { data, hasMore: data?.length === limit };
};
