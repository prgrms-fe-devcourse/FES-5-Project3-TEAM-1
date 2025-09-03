import AddEmojiSvg from '@/assets/icon/add-emoji-24.svg?react';
import { useMemo } from 'react';

interface Props {
  onClick: () => void;
}
const EmojiButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      aria-label="이모지 피커"
      className="group flex-center rounded-full hover:bg-gray-50"
      onClick={onClick}
    >
      {useMemo(
        () => (
          <AddEmojiSvg className="text-gray-dark group-hover:text-black" />
        ),
        [],
      )}
    </button>
  );
};
export default EmojiButton;
