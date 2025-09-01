import { memo } from 'react';

import { FEED_SORT_BY, type FeedSortBy } from '@/shared/types/enum';
import tw from '@/shared/utils/style';

interface Props {
  onChange: (option: FeedSortBy) => void;
  currentSort?: FeedSortBy;
}

const SortTab = ({ onChange, currentSort = FEED_SORT_BY.LATEST }: Props) => {
  const sortOptions = [
    { value: FEED_SORT_BY.LATEST, label: '최신순' },
    { value: FEED_SORT_BY.MOST_COMMENTS, label: '댓글순' },
    { value: FEED_SORT_BY.MOST_REACTIONS, label: '반응순' },
  ];

  return (
    <nav aria-label="피드 정렬 옵션">
      <ul role="tablist" className="flex gap-4">
        {sortOptions.map((option) => (
          <li key={option.value} role="presentation">
            <button
              type="button"
              role="tab"
              className={tw(
                'text-gray text-base py-1',
                currentSort === option.value &&
                  'text-black  border-b font-semibold',
              )}
              aria-selected={currentSort === option.value}
              onClick={() => {
                onChange(option.value);
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default memo(SortTab);
