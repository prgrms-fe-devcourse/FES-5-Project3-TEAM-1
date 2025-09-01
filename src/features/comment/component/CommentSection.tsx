import { LuLoader } from 'react-icons/lu';

import { useComment } from '../hook/useComment';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface CommentListProps {
  feedId: string;
}

export const CommentSection = ({ feedId }: CommentListProps) => {
  const { comment, addComment, isLoading } = useComment(feedId);

  return (
    <div className="flex flex-col h-[250px] px-5 pt-0 pb-3">
      {/* 댓글 입력 */}
      <CommentInput addComment={addComment} />

      {/* 댓글 리스트 */}
      {isLoading ? (
        <div className="flex-center w-full h-full">
          <LuLoader className="animate-spin" size={30} />
        </div>
      ) : (
        <CommentList comments={comment} />
      )}
    </div>
  );
};
