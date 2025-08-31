import FeedInput from '@/shared/components/feed-Input/FeedInput';
import { useFeedUpload } from '../hooks/useFeedUpload';

interface Props {
  threadId: string;
  token: string;
}

const CreateFeed = ({ threadId, token }: Props) => {
  const { content, onSubmit, setContent, setType, drawingRef, type } =
    useFeedUpload({
      threadId,
      token,
    });

  return (
    <FeedInput
      content={content}
      setContent={setContent}
      onSubmit={onSubmit}
      setType={setType}
      drawingRef={drawingRef}
      type={type}
    />
  );
};
export default CreateFeed;
