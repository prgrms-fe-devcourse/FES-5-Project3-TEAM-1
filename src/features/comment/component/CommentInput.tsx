import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/Input';
import { getNicknameFromSession } from '@/shared/utils/nickname';
import { useRef } from 'react';

interface Props {
  addComment: (content: string, nickname: string) => Promise<boolean>;
}

const CommentInput = ({ addComment }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = async () => {
    try {
      if (!inputRef.current) return;

      const value = inputRef.current.value.trim();
      if (!value) return;

      const success = await addComment(
        value,
        getNicknameFromSession() ?? 'nimo',
      );

      if (success) {
        inputRef.current.value = '';
      } else {
        console.log('댓글 등록 실패');
      }
    } catch (error) {
      console.error('댓글 등록 오류:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        label="댓글 입력"
        aria-label="댓글 입력"
        placeholder="댓글을 입력해 주세요."
        showLabel={false}
        ref={inputRef}
        className="flex-1 bg-white h-9"
        autoFocus
        onKeyDown={(e) => {
          // mac OS 일때는 Composing 방지
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
        type="button"
        size="sm"
        color="default"
        onClick={handleAdd}
        aria-label="댓글 등록"
        tabIndex={0}
        className="md:min-w-[80px] max-w-14"
      >
        등록
      </Button>
    </div>
  );
};
export default CommentInput;
