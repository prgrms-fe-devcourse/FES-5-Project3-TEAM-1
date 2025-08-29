import { useComment } from '../hook/useComment';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface CommentListProps {
  feedId: string;
}

export const CommentSection = ({ feedId }: CommentListProps) => {
  const { comment, addComment, isLoading } = useComment(feedId);

  return (
    <div className="flex flex-col">
      {/* 댓글 입력 */}
      <CommentInput addComment={addComment} />

      {/* 댓글 리스트 */}

      {isLoading ? (
        <p className="text-xs text-gray-dark mt-3 py-2 text-center">
          댓글 불러오는 중…
        </p>
      ) : (
        <CommentList comment={comment} />
      )}
    </div>
  );
};
