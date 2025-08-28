export type FeedType = 'text' | 'poll' | 'drawing' | 'balance' | 'image';

export interface Feed {
  comment_count: number;
  content: string;
  created_at: string;
  id: string;
  nickname: string;
  thread_id: string;
  token: string;
  total_reactions: number;
  type: string;
}
