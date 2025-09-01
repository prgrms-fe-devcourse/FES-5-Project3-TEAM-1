import { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { useThreadAuthentication } from './hooks/useThreadAuthentication';
import { useFeeds } from './hooks/useFeed';
import CreateFeed from './components/CreateFeed';
import VirtualFeedList from './components/VirtualFeedList';

import { FEED_SORT_BY, type FeedSortBy } from '@/shared/types/enum';
import PasswordModal from '@/shared/components/modals/PasswordModal';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useCreateTriggerEventChannel } from '@/features/easter-egg/hook/useCreateTriggerEventChannel';
import SortTab from '@/shared/components/tab/SortTab';

const Thread = () => {
  const { threadId } = useParams();

  // TODO:
  if (!threadId) {
    return <Navigate to="/" replace />;
  }

  // 이스터 에그 구독 hook
  useCreateTriggerEventChannel(threadId);
  // 쓰레드 정보 및 검증 hook
  const { isPasswordRequired, validatePassword, token, thread } =
    useThreadAuthentication(threadId);

  // 검증이 필요한 쓰레드인지 파악
  useEffect(() => {
    if (isPasswordRequired) {
      setShowPasswordModal(true);
    }
  }, [isPasswordRequired]);

  // 검증 모달 상태 state
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // 피드 정렬
  const [sortBy, setSortBy] = useState<FeedSortBy>(FEED_SORT_BY.LATEST);

  // 피드 리스트 페치 hook
  const { hasMore, loadMore, isFetchFeedLoading, isInitialLoading } = useFeeds({
    threadId,
    sortBy,
  });

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
    <>
      {/* 헬맷 */}
      <Helmet>
        <title>{`Anonimo | ${thread?.title}`}</title>
        <meta name="description" content={thread?.description} />
        <meta name="keywords" content="익명, 커뮤니티" />
        <meta name="author" content="team whySmile" />
      </Helmet>

      <div className="flex justify-center py-10 bg-bg-main min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-60px)]">
        {/* 비밀번호 모달 */}
        <PasswordModal
          isOpen={showPasswordModal}
          onValidate={handlePasswordValidate}
          onClose={() => setShowPasswordModal(false)}
        />

        <div className="max-w-[640px] w-full px-2">
          {/* 피드 input */}
          <CreateFeed threadId={threadId} token={token} />
          {/* 정렬 tab */}
          <SortTab onChange={handleSortChange} currentSort={sortBy} />
          {/* 리스크 */}
          <VirtualFeedList
            hasMore={hasMore}
            isLoading={isFetchFeedLoading}
            onLoadMore={loadMore}
            isInitialLoading={isInitialLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Thread;
