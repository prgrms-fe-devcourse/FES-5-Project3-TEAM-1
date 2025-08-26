import NimoSVG from '@/assets/icon/nimo-32.svg?react';
import ChevronDown from '@/assets/icon/chevron-down.svg?react';
import { useState } from 'react';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/button/Button';
import tw from '@/shared/utils/style';
import { EmojiPicker } from '@/features/emoji/ui/EmojiPicker';
import { useEmoji } from '@/features/emoji/hook/useEmoji';

interface CardLayoutProps {
  children?: React.ReactNode;
  className?: string;
  nickname: string;
  createdAt: string;
  commentsCount?: number;
  commentsList?: React.ReactNode;
  onSubmit: (text: string) => void;
  feedId: string;
  token: string;
}

const CardLayout = ({
  className,
  nickname,
  createdAt,
  commentsCount = 0,
  commentsList,
  onSubmit,
  children,
  feedId,
  token,
}: CardLayoutProps) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const maxLength = 150;

  const handlePostComment = () => {
    if (!input.trim()) return;
    onSubmit?.(input);
    setInput('');
  };

  const handleToggleComments = () => {
    setIsOpen((prev) => !prev);
  };

  //emoji hook
  const { emojiCounts, handleEmojiClick, myReactions } = useEmoji({
    feedId,
    token,
  });

  const displayedEmoji = emojiCounts.slice(0, 12);

  return (
    <article
      className={tw('bg-white rounded-xl border border-gray-light', className)}
    >
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-light flex items-center justify-center">
          <NimoSVG aria-hidden />
        </div>
        <div>
          <p className="text-base text-black">{nickname}</p>
          <p className="text-xs text-gray-dark">{createdAt}</p>
        </div>
      </div>

      {/*피드 내용*/}
      <div className="px-5 py-4 break-words">{children}</div>

      <div className="bg-bg-sub px-5 py-3 flex items-center justify-between">
        {/*emoji*/}
        <div className="relative flex-1 min-w-0">
          <EmojiPicker
            emojiCounts={displayedEmoji}
            myReactions={myReactions}
            onEmojiClick={handleEmojiClick}
          />
        </div>

        {/*댓글 버튼*/}
        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-1 text-base text-gray-dark hover:cursor-pointer ml-2"
          onClick={handleToggleComments}
          aria-expanded={isOpen}
          aria-label="댓글 보기"
        >
          <span className="whitespace-nowrap">댓글 {commentsCount ?? 0}</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {/*댓글창 열림*/}
      <div
        className={`transition-[max-height] duration-300 rounded-bl-xl rounded-br-xl ease-in-out overflow-hidden bg-bg-sub
        ${isOpen ? 'max-h-[700px] pt-2 pb-2' : 'max-h-0 pt-0 pb-0'}`}
        role="region"
        aria-label="댓글 영역"
        aria-live="polite"
      >
        {/* 댓글 입력 필드 */}
        <div className="flex flex-col px-4">
          <div className="flex gap-2">
            <Input
              label="댓글 입력"
              aria-label="댓글 입력"
              placeholder="댓글을 입력해 주세요."
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
              showLabel={false}
              className="flex-1 bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePostComment();
                }
              }}
            />
            <Button
              size="default"
              color="default"
              onClick={handlePostComment}
              aria-label="댓글 등록"
              tabIndex={0}
              className="min-w-auto md:min-w-[80px]"
            >
              등록
            </Button>
          </div>

          {/* 댓글 리스트 */}
          {commentsList && <div className="mt-3">{commentsList}</div>}
        </div>
      </div>
    </article>
  );
};

export default CardLayout;
