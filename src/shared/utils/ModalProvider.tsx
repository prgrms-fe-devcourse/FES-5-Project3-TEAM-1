import { createContext, useContext, useMemo, useState } from 'react';
// 모달 컴포넌트들을 불러옵니다.
import LoginModal from '@/features/login/ui/LoginModal';
import WelcomeModal from '@/features/login/ui/WelcomeModal';
import CreateThreads from '@/features/thread/create-thread/CreateThread';

// 1. 모달 타입과 인터페이스 정의
export type ModalType = 'login' | 'welcome' | 'createThread';

interface ModalContextType {
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

// 2. 모달 상태를 한 번에 관리
interface ModalState {
  type: ModalType | null;
  props?: any;
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({ type: null, props: {} });

  const openModal = (type: ModalType, props = {}) => {
    setModal({ type, props });
  };

  const closeModal = () => {
    setModal({ type: null, props: {} });
  };

  const value = useMemo(() => ({ openModal, closeModal }), []);

  // 3. 현재 열려있는 모달 타입에 따라 적절한 컴포넌트를 렌더링
  const renderModal = () => {
    if (!modal.type) return null;

    switch (modal.type) {
      case 'login':
        return <LoginModal {...modal.props} onClose={closeModal} />;
      case 'welcome':
        return <WelcomeModal {...modal.props} onClose={closeModal} />;
      case 'createThread':
        return (
          <CreateThreads
            isOpen={true}
            onClose={closeModal}
            mode="create"
          ></CreateThreads>
        );
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};
