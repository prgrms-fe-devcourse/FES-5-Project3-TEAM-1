import type { Feed } from '@/shared/types/feed';
import { create } from 'zustand';

type FeedWithIsExpanded = Feed & { isExpanded: boolean; isNew?: boolean };

type Store = {
  feedById: { [feedId: string]: FeedWithIsExpanded };
  feedIds: string[];
};
type Action = {
  addFeed: (feed: Feed) => void;
  updateFeed: (feed: Feed) => void;
  setFeeds: (feeds: Feed[], rest: boolean) => void;
  setIsExpanded: (feedId: string) => void;
  markAsRead: (feedId: string) => void;
  closeAllExpanded: () => void;
};

export const useFeedStore = create<Store & Action>()((set) => ({
  feedById: {},
  feedIds: [],
  // 피드 추가
  addFeed: (feed) =>
    set((state) => {
      if (state.feedById[feed.id]) return state;
      return {
        feedById: {
          ...state.feedById,
          [feed.id]: { ...feed, isExpanded: false, isNew: true },
        },
        feedIds: [feed.id, ...state.feedIds],
      };
    }),
  // 업데이트 피드
  updateFeed: (feed) =>
    set((state) => ({
      feedById: {
        ...state.feedById,
        [feed.id]: { ...state.feedById[feed.id], ...feed },
      },
    })),
  // fetch 피드
  setFeeds: (feeds, isInitialFetch = false) =>
    set((state) => {
      // initial fetch 인 경우
      if (isInitialFetch) {
        const newFeedById: Record<string, FeedWithIsExpanded> = {};
        const newFeedIds: string[] = [];
        feeds.forEach((feed) => {
          newFeedById[feed.id] = { ...feed, isExpanded: false, isNew: false };
          newFeedIds.push(feed.id);
        });
        return { feedById: newFeedById, feedIds: newFeedIds };
      }
      // 리스트 업데이트
      else {
        const newFeedById = { ...state.feedById };
        const newFeedIds = [...state.feedIds];
        feeds.forEach((feed) => {
          if (!newFeedById[feed.id]) {
            newFeedById[feed.id] = { ...feed, isExpanded: false, isNew: false };
            newFeedIds.push(feed.id);
          }
        });
        return { feedById: newFeedById, feedIds: newFeedIds };
      }
    }),

  setIsExpanded: (feedId) =>
    set((state) => ({
      feedById: {
        ...state.feedById,
        [feedId]: {
          ...state.feedById[feedId],
          isExpanded: !state.feedById[feedId].isExpanded,
        },
      },
    })),

  //새 피드 읽음 처리
  markAsRead: (feedId) =>
    set((state) => ({
      feedById: {
        ...state.feedById,
        [feedId]: {
          ...state.feedById[feedId],
          isNew: false,
        },
      },
    })),
  // 모든 댓글 닫기
  closeAllExpanded: () =>
    set((state) => {
      const newFeedById = { ...state.feedById };
      Object.keys(newFeedById).forEach((feedId) => {
        newFeedById[feedId] = {
          ...newFeedById[feedId],
          isExpanded: false,
        };
      });

      return { feedById: newFeedById };
    }),
}));
