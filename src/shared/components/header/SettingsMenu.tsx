import { NavLink } from 'react-router';
import Button from '../button/Button';
import { useHeaderMenuModal } from '@/shared/hook/useHeaderMenuModal';
import tw from '@/shared/utils/style';
import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  isLoginUser: boolean;
  logout: () => void;
  onClose: () => void;
  className?: string;
}

function SettingsMenu({
  isOpen,
  isLoginUser,
  logout,
  onClose,
  className,
}: Props) {
  const { handleActionModal } = useHeaderMenuModal({
    isLoginUser,
    logout,
    onClose,
  });

  return (
    <div
      tabIndex={-1}
      aria-label="설정 메뉴"
      className={tw(
        'absolute top-12 md:top-17 right-4 flex flex-col justify-between gap-10 px-3 py-2 w-50 max-h-60 rounded-xl bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.40)] transition-all duration-400 ease-out',
        isOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-3 pointer-events-none',
        className,
      )}
    >
      <ul className="flex flex-col">
        {isLoginUser && (
          <li
            role="menuitem"
            className="border-b border-b-gray-light text-center "
          >
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'block w-full py-2 transition-colors duration-200 ease-in-out hover:bg-gray-light/60',
                  isActive && 'bg-gray-light',
                )
              }
            >
              내 스레드 관리
            </NavLink>
          </li>
        )}
        <li
          role="menuitem"
          className="border-b border-b-gray-light text-center"
        >
          <button
            type="button"
            onClick={() => handleActionModal('thread')}
            className="w-full py-2 transition-colors duration-200 ease-in-out hover:bg-gray-light/60"
          >
            스레드 만들기
          </button>
        </li>
        <li
          role="menuitem"
          className="border-b border-b-gray-light text-center"
        >
          <button
            type="button"
            onClick={() => handleActionModal('login')}
            className="w-full py-2 text-[#658eff] dark:text-primary font-bold  transition-colors duration-200 ease-in-out hover:bg-gray-light/60"
          >
            {isLoginUser ? '로그아웃' : '로그인'}
          </button>
        </li>
      </ul>
    </div>
  );
}
export default SettingsMenu;
