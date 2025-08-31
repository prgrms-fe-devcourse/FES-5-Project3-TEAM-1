import { useWindowVirtualizer } from '@tanstack/react-virtual';

interface Props {
  feedIds: string[];
}
export const useFeedVirtualizer = ({ feedIds }: Props) => {
  return useWindowVirtualizer({
    count: feedIds.length,
    estimateSize: () => 150,
    measureElement: (element) => {
      return element?.getBoundingClientRect().height ?? 150;
    },
    overscan: 5,
  });
};
