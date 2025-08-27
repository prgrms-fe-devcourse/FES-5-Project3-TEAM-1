// Thread.tsx
import PasswordModal from './components/PasswordModal';
import { useThreadAuthentication } from '@/pages/Thread/hooks/useThreadAuthentication';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useFeeds } from './hooks/useFeed';
import CreateFeed from './components/CreateFeed';
import VirtualFeedList from './components/VirtualFeedList';
import FeedList from './components/FeedList';
import FeedCard from './components/FeedCard';

const Thread = () => {
  const { threadId } = useParams();

  if (!threadId) {
    return <Navigate to="/" replace />;
  }
  // @ts-ignore
  const { isAuthenticated, isPasswordRequired, validatePassword, token } =
    useThreadAuthentication(threadId);
  const { feeds, hasMore, isFetchFeedLoading, loadMore } = useFeeds(threadId);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // useScrollPosition에서 반환값들 받기

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
    <div className="flex justify-center py-10 bg-bg-main min-h-[calc(100vh-11.75rem)] md:min-h-[calc(100vh-9.25rem)]">
      <PasswordModal
        isOpen={showPasswordModal}
        onValidate={handlePasswordValidate}
        onClose={() => setShowPasswordModal(false)}
      />

      <div className="max-w-[51rem] w-full px-2">
        <CreateFeed threadId={threadId} token={token} />
        <div className="flex flex-col">
          <FeedList
            hasMore={hasMore}
            onLoadMore={loadMore}
            isLoading={isFetchFeedLoading}
          >
            {feeds.map((feed) => (
              <FeedCard
                key={feed.id}
                token={feed.token}
                nickname={feed.nickname}
                commentCount={feed.comment_count}
                createdAt={feed.created_at}
                feedId={feed.id}
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
