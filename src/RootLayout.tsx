import { Outlet, useLocation } from 'react-router';
import Footer from './shared/components/footer/Footer';
import Header from './shared/components/header/Header';
import ScrollUpButton from './shared/components/button/ScrollUpButton';
import clsx from 'clsx';

// const TABS = [
//   { id: 'all', label: '전체' },
//   { id: 'play', label: '투표/게임' },
// ];
// 프로젝트 레이아웃
const RootLayout = () => {
  // const [tab, setTab] = useState('all');

  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isThread = location.pathname.startsWith('/thread');

  console.log(isThread);

  return (
    <div className="flex flex-col relative">
      <Header
        // tabs={isThread ? TABS : undefined}
        // currentTab={tab}
        // onTabChange={(tabId: string) => setTab(tabId)}
        hideParticipantCount={isAdmin}
      />

      <div
        className={clsx(
          'pt-12 md:pt-15',
          isThread ? 'root-min-h-thread' : 'root-min-h',
        )}
      >
        <main className="relative bg-main">
          <Outlet />
        </main>
      </div>

      {!isThread && <Footer />}

      <ScrollUpButton />
    </div>
  );
};
export default RootLayout;
