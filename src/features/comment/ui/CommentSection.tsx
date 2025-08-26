import { useComment } from '@/features/comment/hook/useComment';
import { useMemo } from 'react';
import CardLayout from '@/shared/components/card-Layout/CardLayout';
import CommentList, {
  type CommentListItem,
} from '@/shared/components/card-Layout/CommentList';
import { getNicknameFromSession } from '@/shared/utils/nickname';

interface CommentSectionProps {
  feedId: string;
  token: string;
  nickname: string;
  createdAt: string | null;
  className?: string;
  children?: React.ReactNode;
}

export default function CommentSection({
  feedId,
  token,
  nickname,
  createdAt,
  className,
  children,
}: CommentSectionProps) {
  const { comment, addComment, isLoading } = useComment(feedId, token);

  const items: CommentListItem[] = useMemo(
    () =>
      comment.map((c) => ({
        id: c.id,
        content: c.content,
        nickname: c.nickname,
        createdAt: c.created_at ? new Date(c.created_at).toLocaleString() : '',
      })),
    [comment],
  );

  const handleSubmitComment = (text: string) => {
    const commentNickname = getNicknameFromSession() ?? 'nimo';
    addComment(text, commentNickname);
  };

  return (
    <CardLayout
      className={className}
      nickname={nickname}
      createdAt={createdAt ? new Date(createdAt).toLocaleString() : ''}
      onSubmit={handleSubmitComment}
      commentsCount={items.length}
      commentsList={
        isLoading ? (
          <p className="text-xs text-gray-dark">댓글 불러오는 중…</p>
        ) : (
          <CommentList items={items} />
        )
      }
      feedId={feedId}
      token={token}
    >
      {children}
    </CardLayout>
  );
}
