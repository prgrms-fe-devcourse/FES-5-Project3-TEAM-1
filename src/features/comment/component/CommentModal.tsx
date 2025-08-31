import ModalLayout from '@/shared/components/modals/ModalLayout';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { useComment } from '../hook/useComment';
interface Props {
  feedId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CommentModal = ({ feedId, isOpen, onClose }: Props) => {
  const { comment, addComment, isLoading } = useComment(feedId);

  if (!isOpen) return;

  return (
    <ModalLayout size="md" onClose={onClose}>
      <div className="flex-center flex-col gap-4">
        <h2 className="text-3xl py-5">댓글</h2>
        <div className="w-full">
          <CommentInput addComment={addComment} />
        </div>
        <div className="w-full overflow-y-scroll px-5">
          {isLoading ? (
            <p className="text-xs text-gray-dark mt-3 py-2 text-center">
              댓글 불러오는 중…
            </p>
          ) : (
            <CommentList comment={comment} />
          )}
        </div>
      </div>
    </ModalLayout>
  );
};
export default CommentModal;
