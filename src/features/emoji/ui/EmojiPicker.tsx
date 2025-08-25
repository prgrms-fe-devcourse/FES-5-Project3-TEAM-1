import AddEmojiSvg from '@/assets/icon/add-emoji-20.svg?react';
import { useCallback, useState } from 'react';
import { EmojiGrid } from '../components/EmojiGrid';
import type { EmojiType } from '@/shared/types/emoji';
import EmojiList from '../components/EmojiList';
import EmojiItem from '../components/EmojiItem';

export function EmojiPicker() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [emojis, setEmojis] = useState<EmojiType[]>([]);

  const handleEmojiClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEmojiSelect = useCallback((emoji: string) => {
    setEmojis((prev) => {
      const existingIndex = prev.findIndex((item) => item.emoji === emoji);

      if (existingIndex !== -1) {
        return prev.with(existingIndex, {
          ...prev[existingIndex],
          count: prev[existingIndex].count + 1,
        });
      }
      return [...prev, { emoji, count: 1 }];
    });
    setIsOpen(false);
  }, []);

  const handleEmojiDecrease = useCallback((targetEmoji: string) => {
    setEmojis((prev) => {
      return prev
        .map((item) =>
          item.emoji === targetEmoji
            ? { ...item, count: item.count - 1 }
            : item,
        )
        .filter((item) => item.count > 0);
    });
  }, []);

  return (
    <div className="relative flex">
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="이모지 피커"
          className="flex-center rounded-full p-2 hover:bg-gray-50 h-fit"
          onClick={handleEmojiClick}
        >
          <AddEmojiSvg />
        </button>
        <EmojiList>
          {emojis.map((emoji) => (
            <EmojiItem
              {...emoji}
              key={emoji.emoji}
              onRemove={handleEmojiDecrease}
            />
          ))}
        </EmojiList>
      </div>

      {isOpen && <EmojiGrid onSelect={handleEmojiSelect} />}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
