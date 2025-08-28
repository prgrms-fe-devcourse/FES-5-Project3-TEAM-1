import type { Tables } from '@/shared/types';

export const sortByLatest = (a: Tables<'feeds'>, b: Tables<'feeds'>) => {
  if (a.created_at > b.created_at) return -1;
  else if (a.created_at < b.created_at) return 1;
  else return 0;
};

export const sortByComments = (a: Tables<'feeds'>, b: Tables<'feeds'>) => {
  if (a.comment_count > b.comment_count) return -1;
  else if (a.comment_count < b.comment_count) return 1;
  else return 0;
};
