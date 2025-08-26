import { useCallback, useState } from 'react';
import { ImSpinner } from 'react-icons/im';

import EmojiList from '../components/EmojiList';
import EmojiItem from '../components/EmojiItem';
import EmojiButton from '../components/EmojiButton';
import EmojiGrid from '../components/EmojiGrid';

interface Props {
  emojiCounts: Array<{ emoji: string; counts: number }>;
  myReactions: Set<string>;
  onEmojiClick: (emoji: string) => void;
  isLoading?: boolean;
}

export function EmojiPicker({
  emojiCounts,
  myReactions,
  onEmojiClick,
  isLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenEmojiGrid = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      onEmojiClick(emoji);
      setIsOpen(false);
    },
    [onEmojiClick],
  );
  return (
    <div className="flex items-center gap-2 flex-nowrap ">
      <div className="flex gap-2 overflow-hidden">
        <EmojiButton onClick={handleOpenEmojiGrid} />

        <EmojiList>
          {isLoading ? (
            <div className="flex items-center px-2">
              <ImSpinner className="animate-spin text-primary" />
            </div>
          ) : (
            emojiCounts.map((item) => (
              <EmojiItem
                {...item}
                key={item.emoji}
                isSelected={myReactions.has(item.emoji)}
                onClick={() => handleEmojiSelect(item.emoji)}
              />
            ))
          )}
        </EmojiList>
      </div>

      {isOpen && <EmojiGrid onSelect={handleEmojiSelect} />}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
