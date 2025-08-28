import nimo from '@/assets/nimo/nimo-sm.png';
import ChevronDown from '@/assets/icon/chevron-down.svg?react';
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
  feedId: string;
  token: string;
  isOpen: boolean;
  onToggleComment: () => void;
  feedExtraContent?: React.ReactNode;
}

const CardLayout = ({
  className,
  nickname,
  createdAt,
  commentsCount = 0,
  commentsList,
  children,
  feedId,
  token,
  isOpen,
  onToggleComment,
  feedExtraContent,
}: CardLayoutProps) => {
  const { emojiCounts, handleEmojiClick, myReactions } = useEmoji({
    feedId,
    token,
  });

  const displayedEmoji = emojiCounts.slice(0, 12);

  return (
    <article
      className={tw('bg-white rounded-xl border border-gray-light', className)}
    >
      <div className="px-5 pt-3 pb-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-light flex items-center justify-center">
          <img src={nimo} alt="" aria-hidden />
        </div>
        <div>
          <p className="text-base text-black">{nickname}</p>
          <p className="text-xs text-gray-dark">{createdAt}</p>
        </div>
      </div>
      {/* 피드 내용 */}
      <div className="px-5 pb-3 break-words">{children}</div>
      {/* 추가 피드 콘텐츠 */}
      {feedExtraContent && (
        <div className="px-5 pb-3 before:block before:h-[2px] before:bg-gray-light before:mb-3">
          {feedExtraContent}
        </div>
      )}

      {/* TODO: 이모지 팝업 창 가려지는 문제를 overflow-hidden 지움으로 수정 나중에 확인 필요 */}
      <div className="bg-bg-sub rounded-b-xl">
        {/* 상단 이모지/댓글 토글 바: 라운드 삭제 */}
        <div className="px-5 py-1.5 flex items-center justify-between">
          {/*emoji*/}
          <div className="relative flex-1 min-w-0">
            <EmojiPicker
              emojiCounts={displayedEmoji}
              myReactions={myReactions}
              onEmojiClick={handleEmojiClick}
            />
          </div>

          {/* 댓글 토글 버튼 */}
          <button
            type="button"
            className="flex-shrink-0 flex items-center gap-1 text-base text-gray-dark hover:cursor-pointer ml-2"
            onClick={onToggleComment}
            aria-expanded={isOpen}
            aria-label="댓글 보기"
          >
            <span className="whitespace-nowrap">댓글 {commentsCount ?? 0}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>

        {/* 댓글창 */}
        <div
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
          {commentsList && <div className="px-4">{commentsList}</div>}
        </div>
      </div>
    </article>
  );
};

export default CardLayout;
