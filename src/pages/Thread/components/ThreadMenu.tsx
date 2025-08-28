import { Link } from 'react-router';
import { useState } from 'react';
import NicknameChangeModal from '@/shared/components/modals/NicknameChangeModal';
import clsx from 'clsx';
import { useModal } from '@/shared/utils/ModalProvider';

interface Props {
  isOpen: boolean;
}

function ThreadMenu({ isOpen }: Props) {
  // 닉네임 변경 모달 state
  const [isNicknameModalOpen, setIsNicknameModalOpen] =
    useState<boolean>(false);
  const modal = useModal();

  return (
    <>
      <div className="relative">
        <div
          tabIndex={-1}
          aria-label="설정 메뉴"
          className={clsx(
            'fixed right-0 top-12.5 md:top-16 w-[15rem] h-[100vh] px-3 py-10 bg-white xl:bg-bg-main shadow-xl xl:shadow-none z-[49] transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex flex-col gap-3 pb-5">
            <h2 className="text-md">
              제목입니다제목입니다제목입니다제목입니다
            </h2>
            <p className="text-gray-dark text-sm">
              설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.
            </p>
          </div>

          <ul className="flex flex-col py-3">
            <li className="py-3 border-b-1 border-b-gray">
              <button
                type="button"
                onClick={() => setIsNicknameModalOpen(true)}
                className="text-gray-dark transition-colors duration-150 ease-in-out hover:text-bold hover:text-black"
              >
                닉네임 수정
              </button>
            </li>
            <li className="py-3 border-b-1 border-b-gray">
              <button
                type="button"
                className="text-gray-dark transition-colors duration-150 ease-in-out hover:text-bold hover:text-black"
                onClick={() => modal.openModal('createThread')}
              >
                방 만들기
              </button>
            </li>
            <li className="py-3 border-b-1 border-b-gray">
              <Link
                to="admin"
                className="text-gray-dark  transition-colors duration-150 ease-in-out hover:text-bold hover:text-black"
              >
                방 관리
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="w-full mt-8 py-2 rounded-4xl border-1 border-gray text-gray-dark transition-colors duration-150 ease-in-out hover:bg-bg-sub hover:text-black"
          >
            로그인
          </button>
        </div>
        {/* 닉네임 변경 모달 */}
        {isNicknameModalOpen && (
          <NicknameChangeModal onClose={() => setIsNicknameModalOpen(false)} />
        )}
      </div>
    </>
  );
}
export default ThreadMenu;
