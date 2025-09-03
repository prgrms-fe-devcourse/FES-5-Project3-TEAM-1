import { useCallback, useRef, useState } from 'react';
import { ImSpinner } from 'react-icons/im';

import EmojiList from '../components/EmojiList';
import EmojiItem from '../components/EmojiItem';
import EmojiButton from '../components/EmojiButton';
import EmojiGrid from '../components/EmojiGrid';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';

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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEmojiSelect = useCallback(
    (emoji: string, e?: React.MouseEvent) => {
      onEmojiClick(emoji);
      if (!e?.shiftKey) {
        setIsOpen(false);
      }
    },
    [onEmojiClick],
  );

  // 바깥 클릭 또는 ESC 누르면 닫히도록
  useCloseOnOutsideOrEsc({
    ref: wrapperRef,
    onClose: () => setIsOpen(false),
    enabled: isOpen,
  });
  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center gap-2 flex-nowrap"
    >
      <div className="flex gap-2 overflow-hidden h-7">
        <EmojiButton onClick={handleToggle} />

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
        {isOpen && <EmojiGrid onSelect={handleEmojiSelect} />}
      </div>
    </div>
  );
}
