import { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { useThreadAuthentication } from './hooks/useThreadAuthentication';
import { useFeeds } from './hooks/useFeed';
import CreateFeed from './components/CreateFeed';
import VirtualFeedList from './components/VirtualFeedList';

import { FEED_SORT_BY, type FeedSortBy } from '@/shared/types/enum';
import PasswordModal from '@/shared/components/modals/PasswordModal';
import SortSelector from '@/shared/components/selector/SortSelector';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useCreateTriggerEventChannel } from '@/features/easter-egg/hook/useCreateTriggerEventChannel';

const Thread = () => {
  const { threadId } = useParams();

  // TODO:
  if (!threadId) {
    return <Navigate to="/" replace />;
  }
  // 쓰레드 정보 및 검증 hook
  const { isPasswordRequired, validatePassword, token, thread } =
    useThreadAuthentication(threadId);

  // 피드 정렬
  const [sortBy, setSortBy] = useState<FeedSortBy>(FEED_SORT_BY.LATEST);

  // 피드 리스트 페치 hook
  const { hasMore, loadMore, isFetchFeedLoading, isInitialLoading } = useFeeds({
    threadId,
    sortBy,
  });
  // 모달
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // 이스터 에그
  useCreateTriggerEventChannel(threadId);

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
    <>
      {/* 헬맷 */}
      <Helmet>
        <title>{`Anonimo | ${thread?.title}`}</title>
        <meta name="description" content={thread?.description} />
        <meta name="keywords" content="익명, 커뮤니티" />
        <meta name="author" content="team whySmile" />
      </Helmet>
      <div className="flex justify-center py-10 bg-bg-main min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-60px)]">
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

          {isInitialLoading ? (
            <div className="flex-center py-8 lg:py-20">
              <img
                className="animate-spin"
                width={100}
                height={100}
                src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/nimo_loading.webp"
                alt=""
                loading="eager"
              />
              <span>Loading...</span>
            </div>
          ) : (
            <VirtualFeedList
              hasMore={hasMore}
              isLoading={isFetchFeedLoading}
              onLoadMore={loadMore}
              token={token}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Thread;
