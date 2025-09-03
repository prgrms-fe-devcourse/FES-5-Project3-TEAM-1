import Button from '@/shared/components/button/Button';
import AdminTable from './component/AdminTable';
import { useModal } from '@/shared/utils/ModalProvider';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '@/shared/utils/AuthProvider';
import { toastUtils } from '@/shared/utils/toastUtils';

const AdminPage = () => {
  const modal = useModal();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    toastUtils.error('로그인이 필요한 서비스입니다.');
    return <Navigate to="/" replace />;
  }

  const openModal = () => {
    modal.openModal('createThread', {
      navigateToAdmin: () => navigate('/admin'),
      mode: 'create',
    });
  };

  return (
    <div className="flex justify-center py-8 md:py-10 bg-bg-main min-h-[calc(100vh-9.25rem)] md:min-h-[calc(100vh-9.25rem)]">
      <div className="w-full max-w-[75rem] px-5 ">
        <div className="flex relative w-full mb-8">
          <h2 className="text-center w-full text-2xl md:text-[32px]">
            방 관리
          </h2>
          <Button
            onClick={openModal}
            color="default"
            size="sm"
            className="absolute right-0 top-0 md:top-1.5"
          >
            방 만들기
          </Button>
        </div>

        <AdminTable></AdminTable>
      </div>
    </div>
  );
};

export default AdminPage;
