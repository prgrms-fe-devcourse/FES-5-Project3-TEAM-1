import { useAuth } from '@/shared/utils/AuthProvider';
import { useModal } from '@/shared/utils/ModalProvider';
import { useEffect } from 'react';

const Home = () => {
  const login = useAuth();
  const modal = useModal();
  useEffect(() => {
    if (login.isFirstLogin) {
      modal.openModal('welcome');
      login.firstLogin();
    }
  }, [login.isFirstLogin]);

  return <div className="p-4 flex flex-col gap-2"></div>;
};
export default Home;
