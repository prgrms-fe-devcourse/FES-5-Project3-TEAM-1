import { Outlet, useLocation } from 'react-router';
import Header from '../components/header/Header';
import ScrollUpButton from '../components/button/ScrollUpButton';
import EasterEggSection from '@/features/easter-egg/components/EasterEggSection';
import clsx from 'clsx';
import Footer from '../components/footer/Footer';

function PageLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isThread = location.pathname.startsWith('/thread');

  return (
    <div className="flex flex-col relative text-[var(--color-black)]">
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
      <EasterEggSection />
    </div>
  );
}
export default PageLayout;
