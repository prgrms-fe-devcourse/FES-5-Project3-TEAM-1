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
        'flex-center rounded-full gap-1 bg-quaternary py-[2px] px-[6px] cursor-pointer border-1',
        isSelected && 'border-yellow',
        !isSelected && 'border-gray-light',
      )}
      onClick={onClick}
    >
      <span className="text-sm"> {emoji}</span>
      <span className="text-xs"> {counts}</span>
    </li>
  );
};
export default memo(EmojiItem);
