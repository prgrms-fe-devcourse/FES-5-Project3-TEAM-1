import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import NicknameChangeModal from '@/shared/components/modals/NicknameChangeModal';
import clsx from 'clsx';
import type { Tables } from '@/shared/types';
import { useHeaderMenuModal } from '@/shared/hook/useHeaderMenuModal';

interface Props {
  isOpen: boolean;
  loading: boolean;
  data: Tables<'threads'> | null;
  isLoginUser: boolean;
  logout: () => void;
  onClose: () => void;
  isXl: boolean;
}

function ThreadMenu({
  loading,
  isOpen,
  data,
  isLoginUser,
  logout,
  onClose,
  isXl,
}: Props) {
  // 닉네임 변경 모달 state
  const [isNicknameModalOpen, setIsNicknameModalOpen] =
    useState<boolean>(false);

  const { handleActionModal } = useHeaderMenuModal({
    isLoginUser,
    logout,
    isXl,
    onClose,
  });

  // 모바일때 열릴 시 바디 스크롤 막기
  useEffect(() => {
    if (isOpen && window.innerWidth >= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        tabIndex={-1}
        aria-label="스레드 안 설정 메뉴"
        className={clsx(
          'fixed right-0 top-12.5 md:top-16 w-full md:w-[15rem] h-[100vh] md:h-[calc(100vh-9.5rem)] px-3 py-10 bg-white xl:bg-bg-main shadow-xl xl:shadow-none z-[49] transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col gap-3 pb-5">
          <h2 className="text-md">
            {loading ? '타이틀 가져오는 중 😴' : (data?.title ?? '')}
          </h2>
          <p className="text-gray-dark text-sm">
            {loading
              ? '설명 가져오는 중 😴'
              : data?.description
                ? data?.description
                : '설명 없음'}
          </p>
        </div>

        <ul className="flex flex-col py-3">
          <li className="py-3 border-b-1 border-b-gray">
            <button
              type="button"
              onClick={() => {
                setIsNicknameModalOpen(true);
                handleActionModal('nickname');
              }}
              className="text-gray-dark transition-colors duration-150 ease-in-out hover:text-bold hover:text-black"
            >
              닉네임 수정
            </button>
          </li>
          <li className="py-3 border-b-1 border-b-gray">
            <button
              type="button"
              className="text-gray-dark transition-colors duration-150 ease-in-out hover:text-bold hover:text-black"
              onClick={() => handleActionModal('thread')}
            >
              스레드 만들기
            </button>
          </li>
          {isLoginUser && (
            <li className="py-3 border-b-1 border-b-gray">
              <Link
                to="admin"
                className="text-gray-dark  transition-colors duration-150 ease-in-out hover:text-bold hover:text-black"
                onClick={() => {
                  if (!isXl) onClose();
                }}
              >
                내 스레드 관리
              </Link>
            </li>
          )}
        </ul>

        <button
          type="button"
          className="w-full mt-8 py-2 rounded-4xl border-1 border-gray text-gray-dark transition-colors duration-150 ease-in-out hover:bg-bg-sub hover:text-black"
          onClick={() => {
            handleActionModal('login');
          }}
        >
          {isLoginUser ? '로그아웃' : '로그인'}
        </button>
      </div>
      {/* 닉네임 변경 모달 */}
      {isNicknameModalOpen && (
        <NicknameChangeModal onClose={() => setIsNicknameModalOpen(false)} />
      )}
    </>
  );
}
export default ThreadMenu;
