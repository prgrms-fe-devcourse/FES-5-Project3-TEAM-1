import type { Feed } from '@/shared/types/feed';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

interface Props {
  feeds: Feed[];
}
export const useFeedVirtualizer = ({ feeds }: Props) => {
  return useWindowVirtualizer({
    count: feeds.length,
    estimateSize: () => 150,
    measureElement: (element) => {
      return element?.getBoundingClientRect().height ?? 150;
    },
    overscan: 5,
  });
};
