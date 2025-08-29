import clsx from 'clsx';
import { NavLink } from 'react-router';
import Button from '../button/Button';
import { useHeaderMenuModal } from '@/shared/hook/useHeaderMenuModal';

interface Props {
  isOpen: boolean;
  isLoginUser: boolean;
  logout: () => void;
  onClose: () => void;
}

function SettingsMenu({ isOpen, isLoginUser, logout, onClose }: Props) {
  const { handleActionModal } = useHeaderMenuModal({
    isLoginUser,
    logout,
    onClose,
  });

  return (
    <div
      tabIndex={-1}
      aria-label="설정 메뉴"
      className={clsx(
        'absolute top-full -mt-8 md:mt-2 right-4 flex flex-col justify-between gap-10 px-3 py-2 w-50 max-h-60 rounded-xl bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.40)] transition-all duration-400 ease-out',
        isOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-3 pointer-events-none',
      )}
    >
      {isLoginUser && (
        <ul className="flex flex-col">
          <li
            role="menuitem"
            className="py-2 border-b border-b-gray-light text-center"
          >
            <NavLink to="/admin" onClick={onClose}>
              내 스레드 관리
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => handleActionModal('thread')}
          size="sm"
          color="blue"
          fullWidth
        >
          스레드 만들기
        </Button>
        <Button
          size="sm"
          color="default"
          fullWidth
          onClick={() => handleActionModal('login')}
        >
          {isLoginUser ? '로그아웃' : '로그인'}
        </Button>
      </div>
    </div>
  );
}
export default SettingsMenu;
