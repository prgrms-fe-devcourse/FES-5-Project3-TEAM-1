import type { Feed } from '@/shared/types/feed';
import { create } from 'zustand';

type Store = {
  feedById: { [feedId: string]: Feed };
  feedIds: string[];
};
type Action = {
  addFeed: (feed: Feed) => void;
  updateFeed: (feed: Feed) => void;
  setFeeds: (feeds: Feed[], rest: boolean) => void;
};

export const useFeedStore = create<Store & Action>()((set) => ({
  feedById: {},
  feedIds: [],
  // 피드 추가
  addFeed: (feed) =>
    set((state) => {
      if (state.feedById[feed.id]) return state;
      return {
        feedById: { ...state.feedById, [feed.id]: feed },
        feedIds: [feed.id, ...state.feedIds],
      };
    }),
  // 업데이트 피드
  updateFeed: (feed) => {
    set((state) => ({
      feedById: {
        ...state.feedById,
        [feed.id]: { ...state.feedById[feed.id], ...feed },
      },
    }));
  },
  // fetch 피드
  setFeeds: (feeds, isInitialFetch = false) =>
    set((state) => {
      // initial fetch 인 경우
      if (isInitialFetch) {
        const newFeedById: { [key: string]: Feed } = {};
        const newFeedIds: string[] = [];
        feeds.forEach((feed) => {
          newFeedById[feed.id] = feed;
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
            newFeedById[feed.id] = feed;
            newFeedIds.push(feed.id);
          }
        });
        return { feedById: newFeedById, feedIds: newFeedIds };
      }
    }),
}));
