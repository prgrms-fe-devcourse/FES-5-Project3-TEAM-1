import Button from '@/shared/components/button/Button';
import CardLayout from '@/shared/components/card-Layout/CardLayout';
import CommentList, {
  type CommentListItem,
} from '@/shared/components/card-Layout/CommentList';
import Checkbox from '@/shared/components/checkbox/Checkbox';
import FeedInput from '@/shared/components/feed-Input/FeedInput';
import Input from '@/shared/components/Input';
import Textarea from '@/shared/components/textarea/Textarea';
import { useRef, useState } from 'react';

//emoji 테스트용 데이터
const feedId = '041f817f-b470-412d-be21-9fc3307b0507';
const token =
  '38b6aef3b54c57426cf3800ac23b9dc17ac6892f7dfe7d184305fc348afa9831';

//CardLayout 댓글 나오는지 테스트용 데이터
const commentsList: CommentListItem[] = [
  {
    id: '1',
    nickname: 'user1',
    createdAt: '20분 전',
    content: '안녕하세요',
  },
  {
    id: '2',
    nickname: 'user2',
    createdAt: '20분 전',
    content: '안녕하세요',
  },
];

const Showcase = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col gap-2 p-4 ">
      {/* controlled Components */}
      {/* 기본 인풋 */}
      <Input
        label="일반"
        placeholder="일반 인풋"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Input label="일반" showLabel placeholder="일반 인풋" readOnly />
      {/* 비밀번호 입력 */}
      <Input.Password label="비밀번호" showLabel />
      {/* 삭제 버튼 인풀 */}
      <Input.Row label="항목" showLabel onClick={() => console.log('하이')} />
      {/* 시작 선택 인풋 */}
      <div className="flex gap-4 w-full">
        <Input.TimePicker label="시작 날짜" showLabel readOnly />
        <Input.TimePicker label="끝 날짜" showLabel />
      </div>

      <Textarea label="텍스트 에어리어" showLabel />
      <Checkbox label="중복 투표" showLabel />
      <Checkbox label="중복 투표" />

      {/* 버튼 */}
      {/*size = sm */}
      <Button size="sm" color="default">
        안녕하세요
      </Button>
      <Button size="sm" color="blue">
        버튼
      </Button>
      <Button size="sm" disabled>
        버튼
      </Button>
      <Button size="sm" color="default" fullWidth>
        안녕하세요
      </Button>
      {/*size=default */}
      <Button size="default" color="default">
        버튼
      </Button>
      <Button size="default" color="blue">
        버튼
      </Button>
      <Button size="default" disabled>
        버튼
      </Button>
      <Button size="default" color="default" fullWidth>
        버튼
      </Button>

      {/* uncontrolled Components */}
      <Input.Row
        label="uncontrolled"
        ref={inputRef}
        onClick={() => alert(inputRef.current?.value)}
      />
      <FeedInput></FeedInput>

      <CardLayout
        nickname="Nimo"
        createdAt="1시간 전"
        commentsCount={10}
        commentsList={<CommentList items={commentsList} />}
        onSubmit={(text) => console.log(text)}
        feedId={feedId}
        token={token}
      >
        텍스트 내용
      </CardLayout>
    </div>
  );
};
export default Showcase;
