import { Outlet } from 'react-router';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import { useState } from 'react';

const TABS = [
  { id: 'all', label: '전체' },
  { id: 'play', label: '투표/게임' },
];
// 프로젝트 레이아웃
const RootLayout = () => {
  const [tab, setTab] = useState('all');

  return (
    <div className="flex flex-col">
      <Header
        tabs={TABS}
        currentTab={tab}
        onTabChange={(tabId: string) => setTab(tabId)}
      />

      <div className="root-min-h">
        <main className="bg-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};
export default RootLayout;
