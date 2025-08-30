import { useMemo } from 'react';

import type { CommentType } from '@/shared/api/comment';
import tw from '@/shared/utils/style';
import nimo from '@/assets/nimo/nimo-sm.png';

interface Props {
  comment: CommentType[];
}

const CommentList = ({ comment }: Props) => {
  const items = useMemo(
    () =>
      comment.map((c) => ({
        id: c.id,
        content: c.content,
        nickname: c.nickname,
        createdAt: c.created_at ? new Date(c.created_at).toLocaleString() : '',
      })),
    [comment],
  );

  return (
    <ul className="mt-4 max-h-64">
      {items.length > 0 ? (
        items.map((c) => (
          <li
            key={c.id}
            className={tw(
              'pt-2 border-dashed border-gray-light mb-4',
              'border-b first:pt-0 first:border-t-0',
            )}
            tabIndex={0}
            role="group"
            aria-label={`작성자 ${c.nickname}, 작성시간 ${c.createdAt}, 내용: ${c.content}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-light flex items-center justify-center">
                  <img src={nimo} alt="" className="w-5 h-5" aria-hidden />
                </div>
                <p className="text-sm text-black">{c.nickname}</p>
              </div>
              <p className="text-xs text-gray-dark shrink-0">{c.createdAt}</p>
            </div>

            <p className="text-sm mt-2 mb-2 whitespace-pre-wrap break-words">
              {c.content}
            </p>
          </li>
        ))
      ) : (
        <p className="text-xs text-gray-dark mt-3 py-2 text-center">
          아직 댓글이 없어요!
        </p>
      )}
    </ul>
  );
};
export default CommentList;
