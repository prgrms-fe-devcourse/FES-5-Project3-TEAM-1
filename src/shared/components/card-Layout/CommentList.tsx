import NimoSVG from '@/assets/icon/nimo-32.svg?react';
import tw from '@/shared/utils/style';

export interface CommentListItem {
  id: string;
  content: string;
  nickname: string;
  createdAt: string;
}

export type CommentListProps = {
  items: CommentListItem[];
};

function CommentList({ items }: CommentListProps) {
  return (
    <ul className="mt-3">
      {items.map((c) => (
        <li
          key={c.id}
          className={tw(
            'pt-2 border-dashed border-gray-light',
            'border-t first:pt-0 first:border-t-0',
          )}
          tabIndex={0}
          role="group"
          aria-label={`작성자 ${c.nickname}, 작성일자 ${c.createdAt}, 내용: ${c.content}`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-light flex items-center justify-center">
                <NimoSVG className="w-5 h-5" aria-hidden />
              </div>
              <p className="text-sm text-black">{c.nickname}</p>
            </div>

            <p className="text-xs text-gray-dark shrink-0">{c.createdAt}</p>
          </div>

          <p className="text-sm mt-2 mb-2 whitespace-pre-wrap break-words">
            {c.content}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
