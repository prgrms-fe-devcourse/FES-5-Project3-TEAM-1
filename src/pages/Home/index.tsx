import { useAuth } from '@/shared/utils/AuthProvider';
import { ModalProvider, useModal } from '@/shared/utils/ModalProvider';
import { useEffect } from 'react';

const Home = () => {
  const login = useAuth();
  const modal = useModal();
  useEffect(() => {
    if (login.isFirstLogin) {
      modal.openModal('welcome');
      login.isFirstLogin = false;
    }
  }, [login.isFirstLogin]);

  return (
    <ModalProvider>
      <div className="p-4 flex flex-col gap-2"></div>
    </ModalProvider>
  );
};
export default Home;
