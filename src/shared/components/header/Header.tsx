import { Link, NavLink } from 'react-router';
import logo from '@/assets/logo.png';
import moonSVG from '@/assets/icon/moon-20.svg';
import settingsSVG from '@/assets/icon/settings-32.svg';
import usersSVG from '@/assets/icon/users-16.svg';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';
import Button from '../button/Button';

interface Props {
  tabs?: { id: string; label: string }[];
  currentTab?: string;
  onTabChange?: (tabId: string) => void;
  onOpenCreateModal: (open: boolean) => void;
}

function Header({ tabs, currentTab, onTabChange, onOpenCreateModal }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  /* 훅 이용 (esc or 밖 클릭 시 settingsMenu 닫힘) */
  useCloseOnOutsideOrEsc<HTMLDivElement>({
    ref: settingsMenuRef,
    onClose: () => setIsOpen(false),
  });

  return (
    <header className="flex fixed left-0 top-0 justify-between items-center flex-wrap md:flex-nowrap gap-2 md:gap-4 w-full h-auto md:h-15 px-5 py-2 md:py-0 bg-white shadow-slate-200 shadow-md z-50">
      <Link to="/" className="order-1 w-25">
        <img src={logo} alt="Anonimo" />
      </Link>

      {/* tab 메뉴 */}
      {tabs && tabs.length > 0 && (
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
      )}

      {/* 추가 메뉴 */}
      <div className="flex gap-2 md:gap-4 order-2 md:order-3">
        <button
          className="flex justify-center items-center w-8 h-8 rounded-full bg-secondary"
          aria-label="다크 모드"
        >
          <img src={moonSVG} aria-hidden="true" className="w-5 h-5" />
        </button>
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
        <div ref={settingsMenuRef} className="w-8 h-8">
          <button
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label="설정"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <img src={settingsSVG} alt="" aria-hidden="true" />
          </button>
          {/* 설정 dropdown 메뉴 */}
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
                <NavLink to="/">방 관리</NavLink>
              </li>
              <li
                role="menuitem"
                className="py-2 border-b border-b-gray-light text-center"
              >
                <button type="button">닉네임 수정</button>
              </li>
            </ul>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => onOpenCreateModal(true)}
                size="sm"
                color="blue"
                fullWidth
              >
                방 생성하기
              </Button>
              <Button size="sm" color="default" fullWidth>
                로그인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
