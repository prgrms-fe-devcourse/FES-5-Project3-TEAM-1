import { Link, NavLink, useLocation } from 'react-router';
import logo from '@/assets/logo.png';
import moonSVG from '@/assets/icon/moon-20.svg';
import settingsSVG from '@/assets/icon/settings-32.svg';
import usersSVG from '@/assets/icon/users-16.svg';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';
import Button from '../button/Button';
import { useModal } from '@/shared/utils/ModalProvider';
import { useAuth } from '@/shared/utils/AuthProvider';
import useLogout from '@/features/login/hooks/useLogout';
import ThreadMenu from '@/pages/Thread/components/ThreadMenu';

interface Props {
  // tabs?: { id: string; label: string }[];
  // currentTab?: string;
  // onTabChange?: (tabId: string) => void;
  onOpenCreateModal: (open: boolean) => void;
  hideParticipantCount?: boolean;
  onToggleAside?: () => void;
}

function Header({
  // tabs,
  // currentTab,
  // onTabChange,
  onOpenCreateModal,
  hideParticipantCount,
}: Props) {
  const settingsMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isThread = location.pathname.startsWith('/thread');
  const modal = useModal();
  const loginAuth = useAuth();
  const logout = useLogout();

  // 화면 크기
  const [isXl, setIsXl] = useState(() => window.innerWidth >= 1280);

  const [isOpen, setIsOpen] = useState(() =>
    isThread ? window.innerWidth >= 1280 : false,
  );

  // 화면 resize 시 isXl 와 ThreadMenu 상태 업데이트
  useEffect(() => {
    const handleResizeForMenu = () => {
      const xl = window.innerWidth >= 1280;
      setIsXl(xl);

      if (isThread) {
        // xl 이상일시 열고 아니면 닫음
        setIsOpen(xl);
      }
    };

    window.addEventListener('resize', handleResizeForMenu);
    return () => window.removeEventListener('resize', handleResizeForMenu);
  }, [isThread]);

  /* 훅 이용 (esc or 밖 클릭 시 settingsMenu 닫힘) xl일 시는 안함*/
  useCloseOnOutsideOrEsc<HTMLDivElement>({
    ref: settingsMenuRef,
    onClose: () => setIsOpen(false),
    enabled: !(isThread && isXl),
  });

  return (
    <header className="flex fixed left-0 top-0 justify-between items-center flex-wrap md:flex-nowrap gap-2 md:gap-4 w-full h-auto md:h-15 px-5 py-2 md:py-0 bg-white shadow-slate-200 shadow-sm z-50">
      <div className="flex align-items order-1 gap-3">
        <Link to="/" className="w-20 md:w-25">
          <img src={logo} alt="Anonimo" />
        </Link>

        {isThread && (
          <p className="relative pl-3 w-[100px] text-md md:text-lg md:w-[400px] before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-4 before:bg-black truncate">
            제목입니다제목입니다제목입니다제목입니다
          </p>
        )}
      </div>

      {/* tab 메뉴 */}
      {/* {tabs && tabs.length > 0 && (
        <nav
          role="tablist"
          className="flex order-3 md:order-2 mx-auto -mb-2 md:-mb-0 gap-6 w-full md:w-auto h-10 md:h-full "
        >
          {tabs.map((tab) => (
            <button
              role="tab"
              aria-selected={currentTab === tab.id}
              key={tab.id}
              className={clsx(
                'text-md md:text-xl flex-1 md:flex-auto',
                currentTab === tab.id
                  ? 'font-bold border-b-2 border-b-slate-900'
                  : '',
              )}
              onClick={() => onTabChange?.(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )} */}

      {/* 추가 메뉴 */}
      <div className="flex gap-2 md:gap-4 order-2 md:order-3">
        <button
          className="flex justify-center items-center w-8 h-8 rounded-full bg-secondary"
          aria-label="다크 모드"
        >
          <img src={moonSVG} aria-hidden="true" className="w-5 h-5" />
        </button>
        {!hideParticipantCount && (
          <div className="flex justify-center items-center gap-1 min-w-16 bg-primary rounded-4xl">
            <img
              className="flex w-4 h-4"
              src={usersSVG}
              alt=""
              aria-hidden="true"
            />
            <span
              aria-live="polite"
              aria-label="현재 참여자 수"
              className="text-lg"
            >
              30
            </span>
          </div>
        )}
        <div ref={settingsMenuRef} className="w-8 h-8">
          <button
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label="설정"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <img src={settingsSVG} alt="" aria-hidden="true" />
          </button>

          {isThread ? (
            <ThreadMenu isOpen={isOpen} />
          ) : (
            <div
              tabIndex={-1}
              aria-label="설정 메뉴"
              className={clsx(
                'absolute top-full -mt-8 md:mt-2 right-4 flex flex-col justify-between px-3 py-2 w-50 h-60 rounded-xl bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.20)] transition-all duration-400 ease-out',
                isOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-3 pointer-events-none',
              )}
            >
              <ul className="flex flex-col">
                <li
                  role="menuitem"
                  className="py-2 border-b border-b-gray-light text-center"
                >
                  <NavLink to="/admin">방 관리</NavLink>
                </li>
              </ul>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => onOpenCreateModal(true)}
                  size="sm"
                  color="blue"
                  fullWidth
                >
                  방 만들기
                </Button>
                {loginAuth.userId && (
                  <Button size="sm" color="default" fullWidth onClick={logout}>
                    로그아웃
                  </Button>
                )}
                {!loginAuth.userId && (
                  <Button
                    size="sm"
                    color="default"
                    fullWidth
                    onClick={() => modal.openModal('login')}
                  >
                    로그인
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
