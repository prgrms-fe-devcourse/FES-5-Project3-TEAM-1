import { CommentSection } from '@/features/comment/component/CommentSection';
import { useEmoji } from '@/features/emoji/hook/useEmoji';
import { EmojiPicker } from '@/features/emoji/ui/EmojiPicker';
import tw from '@/shared/utils/style';
import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

interface Props {
  feedId: string;
  commentCount: number;
}

const CardFooter = ({ feedId, commentCount }: Props) => {
  const { emojiCounts, handleEmojiClick, myReactions } = useEmoji({
    feedId,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-bg-sub rounded-b-xl">
      {/* 상단 이모지/댓글 토글 바: 라운드 삭제 */}
      <div className="px-5 py-1.5 flex items-center justify-between">
        {/*emoji*/}
        <div className="relative flex-1 min-w-0">
          <EmojiPicker
            emojiCounts={emojiCounts}
            myReactions={myReactions}
            onEmojiClick={handleEmojiClick}
          />
        </div>
        {/* 댓글 토글 버튼 */}
        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-1 text-base text-gray-dark hover:cursor-pointer ml-2"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label="댓글 보기"
        >
          <span className="whitespace-nowrap text-sm">
            댓글 {commentCount ?? 0}
          </span>
          <GoChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>

      {/* 댓글창 */}
      {isOpen && (
        <div
          className={tw(
            'transition-all duration-300 ease-in-out overflow-hidden',
            isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0 py-0',
          )}
          role="region"
          aria-label="댓글 영역"
          aria-live="polite"
        >
          <CommentSection feedId={feedId} />
        </div>
      )}
      {/* <div
        className={tw(
          'transition-[max-height] duration-300 ease-in-out',
          isOpen
            ? 'max-h-[400px] pt-2 pb-2 overflow-y-auto'
            : 'max-h-0 pt-0 pb-0 overflow-hidden',
        )}
        role="region"
        aria-label="댓글 영역"
        aria-live="polite"
      >
        <CommentSection feedId={feedId} />
      </div> */}
    </div>
  );
};
export default CardFooter;
