import { EmojiPicker } from 'frimousse';

import tw from '@/shared/utils/style';
import { memo } from 'react';

interface Props {
  onSelect: (
    emoji: string,
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const EmojiGrid = ({ onSelect }: Props) => {
  return (
    <EmojiPicker.Root
      className={tw(
        'absolute -top-[17.5rem] left-3 h-[17.5rem] w-[18rem] md:w-[20rem] flex flex-col bg-white dark:bg-neutral-900 p-2 border border-gray-light rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.3)]',
      )}
      locale="ko"
    >
      <EmojiPicker.Search
        name="emojiSearchBar"
        className="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-base dark:bg-neutral-800"
        placeholder="이모지를 검색해주세요..."
        autoFocus
      />
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
          이모지를 찾을 수 없어요.
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
                onClick={(e) => onSelect(emoji.emoji, e)}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  );
};

export default memo(EmojiGrid);
