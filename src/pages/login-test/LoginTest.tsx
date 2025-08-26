import LogoutButton from '@/features/login/ui/LogoutButton';
import { useAuth } from '@/shared/utils/AuthProvider';
import { useModal } from '@/shared/utils/ModalProvider';

function LoginTest() {
  const modal = useModal();
  const auth = useAuth();

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
    </div>
  );
}
export default LoginTest;
