import Button from '@/shared/components/button/Button';
import AdminTable from './component/AdminTable';
import { useModal } from '@/shared/utils/ModalProvider';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '@/shared/utils/AuthProvider';
import { toastUtils } from '@/shared/utils/toastUtils';
import { useState } from 'react';

const AdminPage = () => {
  const modal = useModal();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (isLoading) return <div>Loading..</div>;
  if (!isLoggedIn) {
    toastUtils.error('로그인이 필요한 서비스입니다.');
    return <Navigate to="/" replace />;
  }

  const openModal = () => {
    modal.openModal('createThread', {
      navigateToAdmin: () => navigate('/admin'),
      mode: 'create',
      onSuccess: () => setRefreshTrigger((prev) => prev + 1),
    });
  };

  return (
    <div className="flex justify-center py-8 md:py-10 bg-bg-main min-h-[calc(100vh-9.25rem)] md:min-h-[calc(100vh-9.25rem)]">
      <div className="w-full max-w-[70rem] ">
        <div className="flex justify-end items-center relative w-full mb-3 md:mb-8 px-1 md:px-0 h-[2.25rem] md:h-[2.8125rem]">
          <h2 className="absolute left-1/2 top-0 -translate-x-1/2 text-center text-xl md:text-[32px]">
            내 스레드 관리
          </h2>
          <Button
            onClick={openModal}
            color="default"
            size="sm"
            className="px-2"
          >
            스레드 만들기
          </Button>
        </div>

        <AdminTable
          refreshTrigger={refreshTrigger}
          onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
        ></AdminTable>
      </div>
    </div>
  );
};

export default AdminPage;
