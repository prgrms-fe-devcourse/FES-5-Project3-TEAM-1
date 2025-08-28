import clsx from 'clsx';
import { memo } from 'react';

interface Props {
  emoji: string;
  counts: number;
  isSelected: boolean;
  onClick: () => void;
}

const EmojiItem = ({ counts, emoji, onClick, isSelected }: Props) => {
  return (
    <li
      className={clsx(
        'flex-center rounded-full gap-1 bg-quaternary py-1 px-2 cursor-pointer',
        isSelected && 'border-1 border-yellow',
        !isSelected && '',
      )}
      onClick={onClick}
    >
      <span className="text-xs"> {emoji}</span>
      <span className="text-xs"> {counts}</span>
    </li>
  );
};
export default memo(EmojiItem);
