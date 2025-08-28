import ThreadRow, { type ThreadRowData } from './ThreadRow';
import NimoAdmin from '@/assets/nimo/nimo_admin.svg?react';

// 추후 사용자가 생성한 thread 정보로 변경 필요
const ROOMDATA: ThreadRowData[] = [
  {
    id: '1',
    title: '방 제목',
    link: 'http://',
    password: '123456',
  },
  {
    id: '2',
    title: '방 제목',
    link: 'http://',
    password: '654321',
  },
  {
    id: '3',
    title: '방 제목',
    link: 'http://',
    password: '654321',
  },
  {
    id: '4',
    title: '방 제목',
    link: 'http://',
    password: '654321',
  },
  {
    id: '5',
    title: '방 제목',
    link: 'http://',
    password: '654321',
  },
  {
    id: '6',
    title: '방 제목',
    link: 'http://',
    password: '654321',
  },
];

type AdminTableProps = {
  className?: string;
};

const AdminTable = ({ className }: AdminTableProps) => {
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
            {ROOMDATA.length > 0 ? (
              ROOMDATA.map((t, i) => (
                <ThreadRow
                  key={t.id}
                  index={i + 1}
                  data={t}
                  onEdit={(id) => console.log('수정', id)}
                  onDelete={(id) => console.log('삭제', id)} //나중에 수정하기
                />
              ))
            ) : (
              <tr>
                {/*테이블의 셀을 가로로 합병 */}
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
