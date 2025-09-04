import type { CommentType } from '@/shared/api/comment';
import CommentItem from './CommentItem';

interface Props {
  comments: CommentType[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <ul className="mt-4 h-full overflow-y-auto [scrollbar-gutter:stable]">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))
      ) : (
        <p className="flex-center h-full text-xs text-gray-dark">
          아직 댓글이 없어요!
        </p>
      )}
    </ul>
  );
};
export default CommentList;
