import tw from '@/shared/utils/style';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import { memo } from 'react';

interface CardLayoutProps {
  feedId: string;
  content: string;
  nickname: string;
  createdAt: string;
  commentCount: number;
  className?: string;
  children?: React.ReactNode;
}

const Card = ({
  feedId,
  content,
  nickname,
  createdAt,
  commentCount,
  className,
  children,
}: CardLayoutProps) => {
  return (
    <article
      className={tw('bg-white rounded-xl border border-gray-light', className)}
    >
      {/* 카드 헤더 */}
      <CardHeader createdAt={createdAt} nickname={nickname} />
      {/* 피드 내용 */}
      <div className="px-5 pb-3 break-words">{content}</div>
      {/* 추가 피드 콘텐츠 */}
      {children}
      <CardFooter commentCount={commentCount} feedId={feedId} />
    </article>
  );
};

export default memo(Card);
