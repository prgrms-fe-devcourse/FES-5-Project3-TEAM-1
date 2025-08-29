import { useState } from 'react';
import CardLayout from '@/shared/components/card-Layout/CardLayout';
import CommentList from '@/features/comment/component/CommentList';

interface FeedCardProps {
  feedId: string;
  token: string;
  nickname: string;
  createdAt: string | null;
  className?: string;
  children?: React.ReactNode;
  commentCount?: number;
  feedExtraContent?: React.ReactNode;
}

export default function FeedCard({
  feedId,
  token,
  nickname,
  createdAt,
  className,
  children,
  commentCount,
  feedExtraContent,
}: FeedCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CardLayout
      className={className}
      nickname={nickname}
      createdAt={createdAt ? new Date(createdAt).toLocaleString() : ''}
      commentsCount={commentCount}
      commentsList={isOpen && <CommentList feedId={feedId} token={token} />}
      feedId={feedId}
      onToggleComment={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
      feedExtraContent={feedExtraContent}
    >
      {children}
    </CardLayout>
  );
}
