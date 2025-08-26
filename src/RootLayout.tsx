import { Outlet } from 'react-router';
import { useState } from 'react';
import Footer from './shared/components/footer/Footer';
import Header from './shared/components/header/Header';
import CreateThreads from './features/thread/create-thread/CreateThread';

const TABS = [
  { id: 'all', label: '전체' },
  { id: 'play', label: '투표/게임' },
];
// 프로젝트 레이아웃
const RootLayout = () => {
  const [tab, setTab] = useState('all');
  const [isCreateThreadsModalOpen, setIsCreateThreadsModalOpen] =
    useState(false);

  return (
    <div className="flex flex-col">
      <Header
        tabs={TABS}
        currentTab={tab}
        onTabChange={(tabId: string) => setTab(tabId)}
        onOpenCreateModal={setIsCreateThreadsModalOpen}
      />

      <div className="root-min-h pt-22 md:pt-15">
        <main className="bg-main">
          <Outlet />
        </main>
      </div>

      <Footer />

      {/* 방 생성하기 팝업 */}
      {isCreateThreadsModalOpen && (
        <CreateThreads
          isOpen={isCreateThreadsModalOpen}
          onClose={() => setIsCreateThreadsModalOpen(false)}
        ></CreateThreads>
      )}
    </div>
  );
};
export default RootLayout;
