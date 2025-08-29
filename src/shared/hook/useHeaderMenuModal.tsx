import { useModal } from '../utils/ModalProvider';

interface UseHeaderMenuModalProps {
  isLoginUser: boolean;
  logout: () => void;
  isXl?: boolean;
  onClose: () => void;
}

export const useHeaderMenuModal = ({
  isLoginUser,
  logout,
  isXl,
  onClose,
}: UseHeaderMenuModalProps) => {
  const modal = useModal();

  const handleActionModal = (action: 'nickname' | 'thread' | 'login') => {
    if (!isXl) onClose();

    switch (action) {
      case 'nickname':
        return 'nickname';

      case 'thread':
        if (!isLoginUser) {
          modal.openModal('login');
          return;
        }
        modal.openModal('createThread');
        break;

      case 'login':
        if (isLoginUser) {
          logout();
        } else {
          modal.openModal('login');
        }
        break;
    }
  };

  return { handleActionModal };
};
