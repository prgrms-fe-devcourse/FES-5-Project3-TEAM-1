import Button from '@/shared/components/button/Button';
import AdminTable from './component/AdminTable';
import { useModal } from '@/shared/utils/ModalProvider';

const AdminPage = () => {
  const modal = useModal();
  return (
    <div className="flex justify-center py-8 bg-bg-main min-h-[calc(100vh-11.75rem)] md:min-h-[calc(100vh-9.25rem)]">
      <div className="w-[1200px] px-5 ">
        <div className="relative mb-6">
          <h2 className="text-center text-[32px]">방 관리</h2>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Button
              onClick={() => modal.openModal('createThread')}
              color="default"
              size="sm"
            >
              방 만들기
            </Button>
          </div>
        </div>

        <AdminTable></AdminTable>
      </div>
    </div>
  );
};

export default AdminPage;
