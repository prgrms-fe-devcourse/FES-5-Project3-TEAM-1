import LogoutButton from '@/features/login/ui/LogoutButton';
import CreateThread from '@/features/thread/create-thread/CreateThread';
import { useAuth } from '@/shared/utils/AuthProvider';
import { useModal } from '@/shared/utils/ModalProvider';
import { useState } from 'react';

function LoginTest() {
  const modal = useModal();
  const auth = useAuth();
  const [isCreateThreadsOpen, setIsCreateThreadsOpen] = useState(false);

  return (
    <div className="pt-[10px] pl-[10px] flex flex-col gap-[10px] w-[200px]">
      {auth.isLoggedIn === false && (
        <>
          <button
            className="px-[46px] py-[14.5px] border border-black rounded-3xl w-2xs"
            onClick={() => modal.openModal('login')}
          >
            open login
          </button>
          <button
            className="px-[46px] py-[14.5px] border border-black rounded-3xl w-2xs"
            onClick={() => modal.openModal('welcome')}
          >
            open welcome
          </button>
        </>
      )}
      {auth.isLoggedIn === true && <LogoutButton />}
      <button
        className="border-black border"
        onClick={() => setIsCreateThreadsOpen(true)}
      >
        create thread open
      </button>
      {isCreateThreadsOpen && (
        <CreateThread
          onClose={() => setIsCreateThreadsOpen(false)}
          mode={'update'}
          threadId="e77d8471-271a-4904-a004-6a6a98ac8f25"
        />
      )}
    </div>
  );
}
export default LoginTest;
