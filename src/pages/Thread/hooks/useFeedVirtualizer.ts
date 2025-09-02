import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useFeedStore } from '../utils/store';

interface Props {
  feedIds: string[];
}
export const useFeedVirtualizer = ({ feedIds }: Props) => {
  const feedById = useFeedStore((state) => state.feedById);

  return useWindowVirtualizer({
    count: feedIds.length,
    estimateSize: (index) => {
      const feed = feedById[feedIds[index]];
      return feed.isExpanded ? 150 + 250 : 150;
    },

    overscan: 5,
  });
};
