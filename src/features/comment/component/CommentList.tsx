import { useState, useMemo } from 'react';
import { useComment } from '@/features/comment/hook/useComment';
import nimo from '@/assets/nimo/nimo-sm.png';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/button/Button';
import tw from '@/shared/utils/style';
import { getNicknameFromSession } from '@/shared/utils/nickname';

interface CommentListProps {
  feedId: string;
  token: string;
}

export default function CommentList({ feedId, token }: CommentListProps) {
  const [input, setInput] = useState('');
  const maxLength = 150;

  const { comment, addComment, isLoading } = useComment(feedId, token);

  const handleAdd = () => {
    if (!input.trim()) return;
    const nickname = getNicknameFromSession() ?? 'nimo';
    addComment(input, nickname);
    setInput('');
  };

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
    <div className="flex flex-col">
      {/* 댓글 입력 */}
      <div className="flex gap-2">
        <Input
          label="댓글 입력"
          aria-label="댓글 입력"
          placeholder="댓글을 입력해 주세요."
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
          showLabel={false}
          className="flex-1 bg-white"
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) {
              return;
            }
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button
          size="default"
          color="default"
          onClick={handleAdd}
          aria-label="댓글 등록"
          tabIndex={0}
          className="min-w-auto md:min-w-[80px]"
        >
          등록
        </Button>
      </div>

      {/* 댓글 리스트 */}
      {isLoading ? (
        <p className="text-xs text-gray-dark mt-3">댓글 불러오는 중…</p>
      ) : (
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
          ))}
        </ul>
      )}
    </div>
  );
}
