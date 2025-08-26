import FeedInput from '@/shared/components/feed-Input/FeedInput';
// import { useParams } from 'react-router';
import PasswordModal from './components/PasswordModal';
import { useThread } from '@/pages/Thread/hooks/useThread';
import { useEffect, useState } from 'react';
import CardLayout from '@/shared/components/card-Layout/CardLayout';
import type { CommentListItem } from '@/shared/components/card-Layout/CommentList';
import CommentList from '@/shared/components/card-Layout/CommentList';

const THREAD_ID = '2a5903cd-9105-434d-ac5c-8e0b3c909623';

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

const Thread = () => {
  // const { threadId } = useParams();
  // @ts-ignore
  const { isAuthenticated, isLoading, isPasswordRequired, validatePassword } =
    useThread(THREAD_ID);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (isPasswordRequired) {
      setShowPasswordModal(true);
    }
  }, [isPasswordRequired]);

  const handlePasswordValidate = async (password: string) => {
    const result = await validatePassword(password);

    if (result.success) {
      setShowPasswordModal(false);
    }

    return result;
  };

  return (
    <div
      className="flex justify-center py-10 bg-bg-main min-h-[calc(100vh-11.75rem)] md:min-h-[calc(100vh-9.25rem)]
    "
    >
      <PasswordModal
        isOpen={showPasswordModal}
        onValidate={handlePasswordValidate}
        onClose={() => setShowPasswordModal(false)}
      />

      <div className="max-w-[51rem] w-full px-2">
        <FeedInput />

        <div className="flex flex-col">
          <div className="bg-amber-400">여기에 select 넣으면 됨</div>

          <div className="flex flex-col gap-6 pt-6">
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
        </div>
      </div>
    </div>
  );
};
export default Thread;
