import PasswordModal from './components/PasswordModal';
import { useThreadAuthentication } from '@/pages/Thread/hooks/useThreadAuthentication';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import FeedList from './components/FeedList';
import { useFeeds } from './hooks/useFeed';
import CreateFeed from './components/CreateFeed';
import FeedCard from './components/FeedCard';

const Thread = () => {
  const { threadId } = useParams();

  if (!threadId) {
    return <Navigate to="/" replace />;
  }
  // @ts-ignore
  const { isAuthenticated, isPasswordRequired, validatePassword, token } =
    useThreadAuthentication(threadId);
  const { feeds, setSortBy } = useFeeds(threadId);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (isPasswordRequired) {
      setShowPasswordModal(true);
    }
  }, [isPasswordRequired]);

  const handlePasswordValidate = async (password: string) => {
    const result = await validatePassword(password);

    if (result.success) {
      setShowPasswordModal(false);
    }

    return result;
  };

  return (
    <div
      className="flex justify-center py-10 bg-bg-main min-h-[calc(100vh-11.75rem)] md:min-h-[calc(100vh-9.25rem)]
    "
    >
      <PasswordModal
        isOpen={showPasswordModal}
        onValidate={handlePasswordValidate}
        onClose={() => setShowPasswordModal(false)}
      />

      <div className="max-w-[51rem] w-full px-2">
        <CreateFeed threadId={threadId} token={token} />
        <div className="flex flex-col">
          <select
            className="w-fit"
            defaultValue={'latest'}
            onChange={(e) =>
              setSortBy(e.target.value as 'latest' | 'comments' | 'reactions')
            }
          >
            <option value="latest">최신순</option>
            <option value="comments">댓글 많은순</option>
            <option value="reactions">반응 많은순</option>
          </select>

          <FeedList>
            {feeds?.map((feed) => (
              <FeedCard
                key={feed.id}
                feedId={feed.id}
                token={token}
                nickname={feed.nickname}
                createdAt={feed.created_at}
                commentCount={feed.comment_count}
              >
                {feed.content}
              </FeedCard>
            ))}
          </FeedList>
        </div>
      </div>
    </div>
  );
};
export default Thread;
