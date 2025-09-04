import { useState } from 'react';
import Edit from '@/assets/icon/edit-24.svg?react';
import Delete from '@/assets/icon/delete-24.svg?react';
import EyeOpen from '@/assets/icon/eye-open-15.svg?react';
import EyeClose from '@/assets/icon/eye-close-15.svg?react';
import { toastUtils } from '@/shared/utils/toastUtils';
import CopySVG from '@/assets/icon/copy-right-24.svg?react';
import TooltipButton from '@/shared/components/button/TooltipButton';

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

  const tdCss = 'px-2 h-[50px] align-middel text-center text-base text-black';

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      toastUtils.success('복사 성공😊');
    } catch (error) {
      toastUtils.error('복사 실패🥲 다시 시도해 주세요.');
    }
  };
  return (
    <tr className="bg-white border-b border-gray-light">
      {/* 번호 */}
      <td className={`${tdCss}`}>{index}</td>

      {/* 제목 */}
      <td className={`${tdCss}`}>
        <p
          className="truncate text-base text-black max-w-[320px] text-center"
          title={data.title}
        >
          {data.title}
        </p>
      </td>

      {/* 링크 */}
      <td className={`${tdCss}`}>
        <div className="flex items-center gap-2 max-w-[320px]">
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${data.title} 스레드로 이동`}
            className="truncate text-base text-black hover:underline"
            title={data.link}
          >
            {data.link}
          </a>
          <TooltipButton
            label="링크 복사"
            tooltip="링크 복사"
            onClick={() => handleCopyClipBoard(`${data.link}`)}
          >
            <CopySVG aria-hidden className="text-black" />
          </TooltipButton>
        </div>
      </td>

      {/* 비밀번호 */}
      <td className={`${tdCss}`}>
        <div className="flex justify-center items-center gap-2">
          <span className="text-base tracking-widest">
            {showPw ? (data.password ?? '-') : maskedPw}
          </span>

          {data.password && (
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
              className="shrink-0"
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
      <td className={`${tdCss}`}>
        <button
          type="button"
          aria-label="방 정보 수정"
          className="inline-flex h-5 w-5 mt-2 items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => onEdit?.(data.id)}
          title="수정"
        >
          <Edit className="w-5 h-5 text-black" aria-hidden />
        </button>
      </td>

      {/* 삭제 */}
      <td className={`${tdCss}`}>
        <button
          type="button"
          aria-label="방 삭제"
          className="inline-flex h-5 w-5 mt-2 items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => onDelete?.(data.id)}
          title="삭제"
        >
          <Delete className="w-5 h-5 text-black" aria-hidden />
        </button>
      </td>
    </tr>
  );
}
