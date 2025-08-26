import PasswordModal from './components/PasswordModal';
import { useThreadAuthentication } from '@/pages/Thread/hooks/useThreadAuthentication';
import { useEffect, useState } from 'react';
import CardLayout from '@/shared/components/card-Layout/CardLayout';
// import type { CommentListItem } from '@/shared/components/card-Layout/CommentList';
// import CommentList from '@/shared/components/card-Layout/CommentList';
import { Navigate, useParams } from 'react-router';
import FeedList from './components/FeedList';
import { useFeeds } from './hooks/useFeed';
import CreateFeed from './components/CreateFeed';

//emoji 테스트용 데이터

const Thread = () => {
  const { threadId } = useParams();

  if (!threadId) {
    return <Navigate to="/" replace />;
  }
  // @ts-ignore
  const { isAuthenticated, isPasswordRequired, validatePassword, token } =
    useThreadAuthentication(threadId);
  const { feeds } = useFeeds(threadId);
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
          <div className="bg-amber-400">여기에 select 넣으면 됨</div>

          <FeedList>
            {feeds?.map((feed) => (
              <CardLayout
                nickname={feed.nickname}
                createdAt={feed.created_at}
                commentsCount={10}
                commentsList={<></>}
                onSubmit={(text) => console.log(text)}
                feedId={feed.id}
                token={token}
                key={feed.id}
              >
                {feed.content}
              </CardLayout>
            ))}
          </FeedList>
        </div>
      </div>
    </div>
  );
};
export default Thread;
