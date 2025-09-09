import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import QrCode from '../qr/QrCode';
import NicknameChangeModal from '@/shared/components/modals/NicknameChangeModal';
import type { Tables } from '@/shared/types';
import { useHeaderMenuModal } from '@/shared/hook/useHeaderMenuModal';
import { useThreadStore } from '@/features/thread/utils/store';
import { RxExternalLink } from 'react-icons/rx';

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
  const threadId = useThreadStore.getState().thread?.id;
  const qrRef = useRef<any>(null);
  const currentUrl = `${window.location.origin}/thread/${threadId}`;

  const { handleActionModal } = useHeaderMenuModal({
    isLoginUser,
    logout,
    isXl,
    onClose,
  });

  // 모바일때 열릴 시 바디 스크롤 막기
  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
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
      <aside
        tabIndex={-1}
        aria-label="스레드 안 설정 메뉴"
        className={clsx(
          'fixed right-0 top-12.5 md:top-16 w-full md:w-[15rem] h-[calc(100vh-3rem)] md:h-[calc(100vh-3.75rem)] px-3 py-2 md:py-10 bg-white xl:bg-bg-main shadow-xl xl:shadow-none z-[49] transition-transform duration-300 ease-in-out overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 pb-2 md:pb-5">
              <a
                className="flex justify-start items-center gap-1 border-b border-dotted text-black text-sm pb-2 mb-3 hover:text-red-700 active:scale-[0.99]"
                href="https://github.com/prgrms-fe-devcourse/FES-5-Project3-TEAM-1/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                서비스 개선사항 보내기 <RxExternalLink size={20} />
              </a>
              <h2 className="text-base">
                {loading ? '타이틀 가져오는 중 😴' : (data?.title ?? '')}
              </h2>
              <p className="text-gray-dark text-sm">
                {loading
                  ? '설명 가져오는 중 😴'
                  : data?.description
                    ? data?.description
                    : '설명 없음'}
              </p>
              <QrCode
                qrRef={qrRef}
                title={data?.title ?? ''}
                url={currentUrl}
              />
            </div>

            <ul className="flex flex-col">
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
              className="w-full mt-4 md:mt-8 py-2 rounded-4xl border-1 border-gray text-gray-dark transition-colors duration-150 ease-in-out hover:bg-bg-sub hover:text-black"
              onClick={() => {
                handleActionModal('login');
              }}
            >
              {isLoginUser ? '로그아웃' : '로그인'}
            </button>
          </div>

          <address className="flex flex-col gap-1 not-italic">
            <div className="flex gap-1">
              <strong className="pr-1 relative w-20 after:content-[''] after:block after:absolute after:right-0 after:top-2.5 after:w-0.25 after:h-2 after:bg-slate-900">
                Contact
              </strong>
              <a
                href="https://github.com/prgrms-fe-devcourse/FES-5-Project3-TEAM-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-dark underline"
              >
                GitHub anonimo
              </a>
            </div>
            <div className="flex gap-2">
              <strong className="pr-1 relative w-20 after:content-[''] after:block after:absolute after:right-0 after:top-2.5 after:w-0.25 after:h-2 after:bg-slate-900">
                Made by
              </strong>
              <a
                href="https://github.com/prgrms-fe-devcourse/FES-5-Project3-TEAM-1"
                target="_blank"
                aria-label="anonimo 깃허브"
                rel="noopener noreferrer"
                className="text-gray-dark"
              >
                Whysmile
              </a>
            </div>

            <small className="pt-1 text-sm text-gray-dark">
              &copy; 2025 Anónimo. <br className="hidden md:block" />
              All rights reserved.
            </small>
          </address>
        </div>
      </aside>
      {/* 닉네임 변경 모달 */}
      {isNicknameModalOpen && (
        <NicknameChangeModal onClose={() => setIsNicknameModalOpen(false)} />
      )}
    </>
  );
}
export default ThreadMenu;
