import { useState } from 'react';
import CardLayout from '@/shared/components/card-Layout/CardLayout';
import { CommentSection } from '@/features/comment/component/CommentSection';

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
      commentsList={isOpen && <CommentSection feedId={feedId} />}
      feedId={feedId}
      onToggleComment={() => {
        document.body.style.overflow = 'hidden';

        setIsOpen((prev) => !prev);
        requestAnimationFrame(() => {
          document.body.style.overflow = '';
        });
      }}
      isOpen={isOpen}
      feedExtraContent={feedExtraContent}
    >
      {children}
    </CardLayout>
  );
}
