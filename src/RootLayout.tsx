import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import Footer from './shared/components/footer/Footer';
import Header from './shared/components/header/Header';
import CreateThread from './features/thread/create-thread/CreateThread';
import ScrollUpButton from './shared/components/button/ScrollUpButton';

// const TABS = [
//   { id: 'all', label: '전체' },
//   { id: 'play', label: '투표/게임' },
// ];
// 프로젝트 레이아웃
const RootLayout = () => {
  // const [tab, setTab] = useState('all');
  const [isCreateThreadsModalOpen, setIsCreateThreadsModalOpen] =
    useState(false);

  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col relative">
      <Header
        // tabs={isThread ? TABS : undefined}
        // currentTab={tab}
        // onTabChange={(tabId: string) => setTab(tabId)}
        onOpenCreateModal={setIsCreateThreadsModalOpen}
        hideParticipantCount={isAdmin}
      />

      <div className="root-min-h pt-12 md:pt-15">
        <main className="relative bg-main">
          <Outlet />
        </main>
      </div>

      <Footer />
      <ScrollUpButton />

      {/* 방 생성하기 팝업 */}
      {isCreateThreadsModalOpen && (
        <CreateThread
          isOpen={isCreateThreadsModalOpen}
          onClose={() => setIsCreateThreadsModalOpen(false)}
          mode="create"
        ></CreateThread>
      )}
    </div>
  );
};
export default RootLayout;
