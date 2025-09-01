import type { CommentType } from '@/shared/api/comment';
import nimo from '@/assets/nimo/nimo-sm.png';
import { memo } from 'react';

interface Props {
  comment: CommentType;
}

const CommentItem = ({ comment }: Props) => {
  const formattedDate = new Date(comment.created_at || '').toLocaleString();

  return (
    <li
      key={comment.id}
      className="pt-2 border-dashed border-gray-light mb-4 border-b first:pt-0 first:border-t-0"
      tabIndex={0}
      role="group"
      aria-label={`작성자 ${comment.nickname}, 작성시간 ${formattedDate}, 내용: ${comment.content}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-light flex items-center justify-center">
            <img
              src={nimo}
              alt=""
              className="w-5 h-5"
              aria-hidden
              loading="lazy"
            />
          </div>
          <p className="text-sm text-black">{comment.nickname}</p>
        </div>
        <p className="text-xs text-gray-dark shrink-0">{formattedDate}</p>
      </div>

      <p className="text-sm mt-2 mb-2 whitespace-pre-wrap break-words">
        {comment.content}
      </p>
    </li>
  );
};
export default memo(CommentItem);
