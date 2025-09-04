import { useWindowVirtualizer } from '@tanstack/react-virtual';

interface Props {
  feedIds: string[];
}
export const useFeedVirtualizer = ({ feedIds }: Props) => {
  return useWindowVirtualizer({
    count: feedIds.length,
    estimateSize: () => 400,
    overscan: 5,
  });
};
