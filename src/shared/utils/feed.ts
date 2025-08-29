import { FEED_SORT_BY, type FeedSortBy } from '../types/enum';

// 기본 정렬 config
export const getOrderConfig = (sortBy: FeedSortBy) => {
  switch (sortBy) {
    case FEED_SORT_BY.LATEST:
      return { column: 'created_at', ascending: false };
    case FEED_SORT_BY.MOST_REACTIONS:
      return { column: 'reaction_count', ascending: false };
    case FEED_SORT_BY.MOST_COMMENTS:
      return { column: 'comment_count', ascending: false };
    default:
      return { column: 'created_at', ascending: false };
  }
};

// rpc 정렬 config
export const SORT_CONFIG = {
  [FEED_SORT_BY.LATEST]: {
    order_by: 'created_at',
    order_desc: true,
  },
  [FEED_SORT_BY.MOST_REACTIONS]: {
    order_by: 'total_reactions',
    order_desc: true,
  },
  [FEED_SORT_BY.MOST_COMMENTS]: {
    order_by: 'comment_count',
    order_desc: true,
  },
} as const;
