import { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { useThreadAuthentication } from '@/pages/Thread/hooks/useThreadAuthentication';

import PasswordModal from './components/PasswordModal';
import { useFeeds } from './hooks/useFeed';
import CreateFeed from './components/CreateFeed';
import SortSelector from './components/SortSelector';
import { FEED_SORT_BY, type FeedSortBy } from '@/shared/types/enum';
import VirtualFeedList from './components/VirtualFeedList';
import EmptyFeed from './components/EmptyFeed';

const Thread = () => {
  const { threadId } = useParams();

  // TODO:
  if (!threadId) {
    return <Navigate to="/" replace />;
  }
  // 쓰레드 정보 및 검증 hook
  const { isPasswordRequired, validatePassword, token } =
    useThreadAuthentication(threadId);

  // 피드 정렬
  const [sortBy, setSortBy] = useState<FeedSortBy>(FEED_SORT_BY.LATEST);
  // 피드 리스트 페치 hook
  const { feeds, hasMore, isFetchFeedLoading, loadMore } = useFeeds({
    threadId,
    sortBy,
  });

  // 모달
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (isPasswordRequired) {
      setShowPasswordModal(true);
    }
  }, [isPasswordRequired]);

  // 쓰레드 비밀번호 검증 헨들러
  const handlePasswordValidate = async (password: string) => {
    const result = await validatePassword(password);

    if (result.success) {
      setShowPasswordModal(false);
    }
    return result;
  };

  // 정렬 핸들러
  const handleSortChange = useCallback((option: FeedSortBy) => {
    setSortBy(option);
  }, []);

  return (
    <div className="flex justify-center py-10 bg-bg-main min-h-[calc(100vh-11.75rem)] md:min-h-[calc(100vh-9.25rem)]">
      <PasswordModal
        isOpen={showPasswordModal}
        onValidate={handlePasswordValidate}
        onClose={() => setShowPasswordModal(false)}
      />
      <div className="max-w-[640px] w-full px-2">
        {/* 피드 인풋 */}
        <CreateFeed threadId={threadId} token={token} />
        {/* 정렬 */}
        <SortSelector onChange={handleSortChange} />

        {/* 피드 리스트 */}
        {feeds.length > 0 ? (
          <VirtualFeedList
            feeds={feeds}
            hasMore={hasMore}
            isLoading={isFetchFeedLoading}
            onLoadMore={loadMore}
            token={token}
          />
        ) : (
          // 피드가 아무것도 없을 경우
          <EmptyFeed />
        )}
      </div>
    </div>
  );
};

export default Thread;
