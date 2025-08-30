import { memo } from 'react';

import { FEED_SORT_BY, type FeedSortBy } from '@/shared/types/enum';

interface Props {
  onChange: (option: FeedSortBy) => void;
}

const SortSelector = ({ onChange }: Props) => {
  return (
    <select
      className="w-25"
      onChange={(e) => onChange(e.target.value as FeedSortBy)}
    >
      <option value={FEED_SORT_BY.LATEST}>최신순</option>
      <option value={FEED_SORT_BY.MOST_COMMENTS}>댓글 많은순</option>
      <option value={FEED_SORT_BY.MOST_REACTIONS}>반응 많은순</option>
    </select>
  );
};
export default memo(SortSelector);
