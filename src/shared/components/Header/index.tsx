import { Link, NavLink } from 'react-router';
import logo from '@/assets/logo.png';
import moonSVG from '@/assets/icon/moon-20.svg';
import settingsSVG from '@/assets/icon/settings-36.svg';
import usersSVG from '@/assets/icon/users-20.svg';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  tabs: { id: string; label: string }[];
  currentTab: string;
  onTabChange: (tabId: string) => void;
}

function Header({ tabs, currentTab, onTabChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex items-center md:flex-nowrap relative w-full px-5 pt-2 md:h-20 h-auto flex-wrap justify-between gap-2 md:gap-4 shadow-slate-200 shadow-md z-50">
      <Link to="/" className="order-1">
        <img src={logo} alt="Anonimo" />
      </Link>
      <nav
        role="tablist"
        className="flex order-3 md:order-2 mx-auto gap-6 w-full h-18 md:w-auto "
      >
        {tabs.map((tab) => (
          <button
            role="tab"
            aria-selected={currentTab === tab.id}
            key={tab.id}
            className={clsx(
              'text-xl flex-1 md:flex-auto',
              currentTab === tab.id
                ? 'font-bold border-b-2 border-b-slate-900'
                : '',
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex gap-4 order-2 md:order-3">
        <button
          className="flex justify-center items-center w-9 h-9 rounded-full bg-secondary"
          aria-label="다크 모드"
        >
          <img src={moonSVG} aria-hidden="true" className="w-5 h-5" />
        </button>
        <div className="flex justify-center items-center gap-1 min-w-20 bg-primary rounded-4xl">
          <img
            className="flex w-5 h-5"
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
        <button
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="설정"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={settingsSVG} alt="" aria-hidden="true" />
        </button>
      </div>

      <div
        tabIndex={-1}
        aria-label="설정 메뉴"
        className={clsx(
          'absolute top-full -mt-15 md:mt-2 right-5 flex flex-col justify-between px-3 py-2 w-50 h-60 rounded-xl bg-white shadow-2xl transition-all duration-400 ease-out',
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

        <button>버튼 컴포넌트 올 예정</button>
      </div>
    </header>
  );
}
export default Header;
