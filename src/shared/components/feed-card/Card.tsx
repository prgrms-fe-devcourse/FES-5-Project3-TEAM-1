import tw from '@/shared/utils/style';
import CardHeader from './CardHeader';
import { memo, useEffect, useRef } from 'react';
import { useFeedStore } from '@/pages/Thread/utils/store';
import { useEmoji } from '@/features/emoji/hook/useEmoji';
import { EmojiPicker } from '@/features/emoji/ui/EmojiPicker';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { CommentSection } from '@/features/comment/component/CommentSection';

interface CardLayoutProps {
  feedId: string;
  content: string;
  nickname: string;
  createdAt: string;
  commentCount: number;
  isExpanded?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Card = ({
  feedId,
  content,
  nickname,
  createdAt,
  commentCount,
  isExpanded,
  className,
  children,
}: CardLayoutProps) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const setIsExpanded = useFeedStore((state) => state.setIsExpanded);
  const { emojiCounts, handleEmojiClick, myReactions } = useEmoji({
    feedId,
  });
  const markAsRead = useFeedStore((state) => state.markAsRead);
  const feed = useFeedStore((state) => state.feedById[feedId]);

  const handleToggle = () => {
    setIsExpanded(feedId);

    // 펼칠 때만 화면 가운대로 이동
    if (!isExpanded) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 0);
    }
  };
  //3초 후에 자동 읽음 처리
  useEffect(() => {
    if (feed?.isNew) {
      const timer = setTimeout(() => {
        markAsRead(feedId);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [feed?.isNew, feedId, markAsRead]);

  return (
    <article
      ref={cardRef}
      className={tw(
        'bg-white rounded-xl border transition-all duration-200 ease-in border-gray-light hover:shadow-[0_0_5px_rgba(0,0,0,0.25)]',
        feed?.isNew ? 'animate-shadowPulse' : '',
        className,
      )}
    >
      {/* 카드 헤더 */}
      <CardHeader createdAt={createdAt} nickname={nickname} />
      {/* 피드 내용 */}
      <div className="px-5 pb-3 break-words">{content}</div>
      {/* 추가 피드 콘텐츠 */}
      {children}
      {/* 푸터 영역 */}
      <div className="bg-bg-sub rounded-b-xl">
        {/* 댓글 모달 */}
        {/* 상단 이모지/댓글 토글 바: 라운드 삭제 */}
        <div className="px-5 py-1 flex items-start justify-between">
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
            className="group flex-shrink-0 flex items-center gap-1 text-base h-[26px] text-gray-dark hover:cursor-pointer ml-2 transition-all duration-100 hover:text-black"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-label="댓글 보기"
          >
            <span className="whitespace-nowrap text-sm">
              댓글 {commentCount}
            </span>
            {isExpanded ? (
              <GoChevronUp className="group-hover:hover:text-black" />
            ) : (
              <GoChevronDown className="group-hover:hover:text-black" />
            )}
          </button>
        </div>
        {isExpanded && <CommentSection feedId={feedId} />}
      </div>
    </article>
  );
};

export default memo(Card);
