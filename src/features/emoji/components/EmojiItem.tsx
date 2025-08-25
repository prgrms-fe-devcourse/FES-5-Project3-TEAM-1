import { memo } from 'react';

interface Props {
  emoji: string;
  count: number;
  onRemove: (targetEmoji: string) => void;
}

const EmojiItem = ({ count, emoji, onRemove }: Props) => {
  return (
    <li
      className="flex-center rounded-full gap-2 bg-[#FEFAE0] py-2 px-2.5 cursor-pointer"
      onClick={() => onRemove(emoji)}
    >
      <span className="text-xs"> {emoji}</span>
      <span className="text-xs"> {count}</span>
    </li>
  );
};
export default memo(EmojiItem);
