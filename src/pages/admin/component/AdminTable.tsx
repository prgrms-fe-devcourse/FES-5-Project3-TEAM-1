import { useModal } from '@/shared/utils/ModalProvider';
import { useEffect, useState } from 'react';
import ThreadRow, { type ThreadRowData } from './ThreadRow';
import { useAuth } from '@/shared/utils/AuthProvider';
import { getThreadsByUserId, removeThreads } from '@/shared/api/thread';
import { toastUtils } from '@/shared/utils/toastUtils';
import ConfirmModal from '@/shared/components/modals/ConfirmModal';

type AdminTableProps = {
  className?: string;
};

const AdminTable = ({ className }: AdminTableProps) => {
  const [rows, setRows] = useState<ThreadRowData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [threadToDelete, setThreadToDelete] = useState<string | null>(null); // 추가!

  const { userId } = useAuth();
  const modal = useModal();

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await getThreadsByUserId(userId);
        setRows(
          data.map((t) => ({
            id: t.id,
            title: t.title,
            link: t.link,
            password: t.password ?? '',
          })),
        );
      } catch (e: any) {
        setError(e?.message ?? '목록을 불러오지 못했어요.');
        setRows([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  // 삭제 모달 오픈
  const handleDeleteClick = (threadId: string) => {
    setThreadToDelete(threadId);
    setIsDeleteModalOpen(true);
  };

  // 삭제 로직
  const handleConfirmDelete = async () => {
    if (!threadToDelete) return;

    try {
      const deleted = await removeThreads(threadToDelete);
      if (deleted) {
        setRows((prev) => prev.filter((t) => t.id !== threadToDelete));
        toastUtils.success('스레드가 삭제되었습니다.');
      }
    } catch (error) {
      toastUtils.error('스레드 삭제에 실패했습니다.');
      console.error(error);
    } finally {
      setIsDeleteModalOpen(false);
      setThreadToDelete(null);
    }
  };
  // 삭제 취소
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setThreadToDelete(null);
  };
  return (
    <div
      className={`relative bg-white w-full rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.20)]  ${className ?? ''}`}
    >
      <div className="h-[60vh] md:h-[65vh] min-h-auto overflow-y-auto overflow-x-auto">
        <table className="w-full table-fixed min-w-[760px]">
          <thead className="sticky top-0 z-10 bg-secondary">
            <tr className="text-black text-base ">
              <th className="px-4 py-3 w-[10%]  font-medium text-center">
                번호
              </th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">링크</th>
              <th className="px-4 py-3 w-[25%] text-base font-medium">
                비밀번호
              </th>
              <th className="px-2 py-3 w-[10%] font-medium">수정</th>
              <th className="px-2 py-3 w-[10%] font-medium">삭제</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-0">
                  <div className="h-[calc(360px-48px)] flex items-center justify-center">
                    <p className="text-black">불러오는 중…</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="p-0">
                  <div className="h-[calc(360px-48px)] flex items-center justify-center">
                    <p className="text-red">{error}</p>
                  </div>
                </td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((t, i) => (
                <ThreadRow
                  key={t.id}
                  index={i + 1}
                  data={t}
                  onEdit={(id) =>
                    modal.openModal('createThread', { id, mode: 'update' })
                  }
                  onDelete={handleDeleteClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-0">
                  <div className="h-[calc(360px-48px)] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <img
                        width="120"
                        height="120"
                        src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/ano_search.png"
                        loading="lazy"
                        className="lg:w-40 lg:h-40"
                      />
                      <p className="text-base text-black">
                        생성된 스레드가 없습니다.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div
          className="absolute -left-5 -top-20 md:-left-5 md:-top-23"
          aria-hidden
        >
          <img
            width="100"
            height="100"
            src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/nimo_admin.png"
            loading="lazy"
            className="lg:w-30 lg:h-30"
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          title="스레드 삭제"
          content="해당 스레드를 삭제 하시겠습니까?"
          onClose={handleCancelDelete}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AdminTable;
