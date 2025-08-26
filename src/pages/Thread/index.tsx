import FeedInput from '@/shared/components/feed-Input/FeedInput';
// import { useParams } from 'react-router';
import PasswordModal from './components/PasswordModal';
import { useThread } from '@/pages/Thread/hooks/useThread';
import { useEffect, useState } from 'react';

const THREAD_ID = '2a5903cd-9105-434d-ac5c-8e0b3c909623';

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
    <div className="flex justify-center py-5">
      <PasswordModal
        isOpen={showPasswordModal}
        onValidate={handlePasswordValidate}
        onClose={() => setShowPasswordModal(false)}
      />

      <FeedInput />
    </div>
  );
};
export default Thread;
