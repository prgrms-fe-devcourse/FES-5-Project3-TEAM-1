import FeedInput from '@/shared/components/feed-Input/FeedInput';
import { useFeedUpload } from '../hooks/useFeedUpload';

interface Props {
  threadId: string;
  token: string;
  nickname?: string;
}

const CreateFeed = ({ threadId, token, nickname }: Props) => {
  const { content, onSubmit, setContent, setType } = useFeedUpload({
    threadId,
    token,
    nickname,
  });
  return (
    <FeedInput
      content={content}
      setContent={setContent}
      onSubmit={onSubmit}
      setType={setType}
    />
  );
};
export default CreateFeed;
