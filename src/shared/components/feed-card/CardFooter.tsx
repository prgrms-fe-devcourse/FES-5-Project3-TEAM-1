import { useState } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';

import { CommentSection } from '@/features/comment/component/CommentSection';
import { useEmoji } from '@/features/emoji/hook/useEmoji';
import { EmojiPicker } from '@/features/emoji/ui/EmojiPicker';

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
      {/* 댓글 모달 */}
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
          className="group flex-shrink-0 flex items-center gap-1 text-base text-gray-dark hover:cursor-pointer ml-2 transition-all duration-100 hover:text-black"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label="댓글 보기"
        >
          <span className="whitespace-nowrap text-sm">댓글 {commentCount}</span>
          {isOpen ? (
            <GoChevronUp className="group-hover:hover:text-black" />
          ) : (
            <GoChevronDown className="group-hover:hover:text-black" />
          )}
        </button>
      </div>
      {isOpen && <CommentSection feedId={feedId} />}
    </div>
  );
};
export default CardFooter;
