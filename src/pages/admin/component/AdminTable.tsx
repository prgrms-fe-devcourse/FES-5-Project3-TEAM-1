import { useEffect, useState } from 'react';
import ThreadRow, { type ThreadRowData } from './ThreadRow';
import NimoAdmin from '@/assets/nimo/nimo_admin.svg?react';
import { useAuth } from '@/shared/utils/AuthProvider';
import { getThreadsByUserId } from '@/shared/api/thread';

type AdminTableProps = {
  className?: string;
};

const AdminTable = ({ className }: AdminTableProps) => {
  const [rows, setRows] = useState<ThreadRowData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    setError('');
    (async () => {
      const data = await getThreadsByUserId(userId);
      setRows(
        data.map((t) => ({
          id: t.id,
          title: t.title,
          link: t.link,
          password: t.password ?? '',
        })),
      );
    })();
  }, [userId]);

  return (
    <div
      className={`bg-white w-full rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.20)] ${className ?? ''}`}
    >
      <div className="max-h-[520px] min-h-[400px] overflow-auto rounded-lg">
        <table className="w-full h-full table-fixed">
          <thead className="sticky top-0 z-10 bg-secondary">
            <tr className="text-black text-base ">
              <th className="px-4 py-3 w-[100px]  font-medium text-center">
                번호
              </th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">링크</th>
              <th className="px-4 py-3 w-[100px] text-base font-medium">
                비밀번호
              </th>
              <th className="px-2 py-3 w-[90px] font-medium">수정</th>
              <th className="px-2 py-3 w-[90px] font-medium">삭제</th>
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
                  onEdit={(id) => console.log('수정', id)}
                  onDelete={(id) => console.log('삭제', id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-0">
                  <div className="h-[calc(360px-48px)] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <NimoAdmin
                        className="w-[200px] h-[200px] select-none"
                        aria-hidden
                      />
                      <p className="text-base text-black">
                        생성된 방이 없습니다.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
