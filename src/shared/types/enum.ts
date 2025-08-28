export const FEED_SORT_BY = {
  LATEST: 'latest',
  MOST_REACTIONS: 'most_reactions',
  MOST_COMMENTS: 'most_comments',
} as const;

export type FeedSortBy = (typeof FEED_SORT_BY)[keyof typeof FEED_SORT_BY];
