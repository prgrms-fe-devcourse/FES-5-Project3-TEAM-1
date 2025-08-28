import { useState } from 'react';
import Edit from '@/assets/icon/edit-24.svg?react';
import Delete from '@/assets/icon/delete-24.svg?react';
import EyeOpen from '@/assets/icon/eye-open-15.svg?react';
import EyeClose from '@/assets/icon/eye-close-15.svg?react';

//나중에 교체할 데이터
export type ThreadRowData = {
  id: string;
  title: string;
  link: string;
  password: string | null;
};

type ThreadRowProps = {
  index: number;
  data: ThreadRowData;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function ThreadRow({
  index,
  data,
  onEdit,
  onDelete,
}: ThreadRowProps) {
  const [showPw, setShowPw] = useState(false);

  const maskedPw = data.password ? '•'.repeat(data.password.length) : '-';

  return (
    <tr className="border-b border-gray-light">
      {/* 번호 */}
      <td className="px-4 h-[50px] align-middle text-center text-base text-black">
        {index}
      </td>

      {/* 제목 */}
      <td className="px-4 h-[50px] align-middle">
        <p
          className="truncate text-base text-black max-w-[320px] text-center"
          title={data.title}
        >
          {data.title}
        </p>
      </td>

      {/* 링크 */}
      <td className="px-4 h-[50px] align-middle">
        <div className="flex items-center gap-2 max-w-[320px]">
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            className="truncate text-base text-black hover:underline"
            title={data.link}
          >
            {data.link}
          </a>
        </div>
      </td>

      {/* 비밀번호 */}
      <td className="px-4 h-[50px] align-middle">
        <div className="flex items-center gap-2">
          <span className="text-base tracking-widest">
            {showPw ? (data.password ?? '-') : maskedPw}
          </span>

          {data.password && (
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPw ? (
                <EyeOpen
                  className="w-[16px] h-[16px] text-gray-dark hover:text-black"
                  aria-hidden
                />
              ) : (
                <EyeClose
                  className="w-[16px] h-[16px] text-gray-dark hover:text-black"
                  aria-hidden
                />
              )}
            </button>
          )}
        </div>
      </td>

      {/* 수정 */}
      <td className="px-2 h-[50px] align-middle text-center w-[72px]">
        <button
          type="button"
          aria-label="방 정보 수정"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => onEdit?.(data.id)}
          title="수정"
        >
          <Edit />
        </button>
      </td>

      {/* 삭제 */}
      <td className="px-2 h-[50px] align-middle text-center w-[72px]">
        <button
          type="button"
          aria-label="방 삭제"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => onDelete?.(data.id)}
          title="삭제"
        >
          <Delete />
        </button>
      </td>
    </tr>
  );
}
