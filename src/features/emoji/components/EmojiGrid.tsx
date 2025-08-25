'use client';

import tw from '@/shared/utils/style';
import { EmojiPicker } from 'frimousse';

interface Props {
  onSelect: (emoji: string) => void;
}

export function EmojiGrid({ onSelect }: Props) {
  const handleEmojiClick = ({ emoji }: { emoji: string; label: string }) => {
    onSelect(emoji);
  };

  return (
    <EmojiPicker.Root
      className={tw(
        'absolute top-10 right-0 isolate flex h-[368px] w-fit flex-col bg-white dark:bg-neutral-900 z-50 p-2 border border-gray-light rounded-2xl',
      )}
      onEmojiSelect={handleEmojiClick}
    >
      <EmojiPicker.Search className="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-sm dark:bg-neutral-800" />
      <EmojiPicker.Viewport
        className="relative flex-1 outline-hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
          Loading…
        </EmojiPicker.Loading>
        <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
          No emoji found.
        </EmojiPicker.Empty>
        <EmojiPicker.List
          className="select-none pb-1.5"
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <div
                className="bg-white px-3 pt-3 pb-1.5 font-medium text-neutral-600 text-xs dark:bg-neutral-900 dark:text-neutral-400"
                {...props}
              >
                {category.label}
              </div>
            ),
            Row: ({ children, ...props }) => (
              <div className="scroll-my-1.5 px-1.5" {...props}>
                {children}
              </div>
            ),
            Emoji: ({ emoji, ...props }) => (
              <button
                className="flex size-8 items-center justify-center rounded-md text-lg data-[active]:bg-neutral-100 dark:data-[active]:bg-neutral-800"
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  );
}
