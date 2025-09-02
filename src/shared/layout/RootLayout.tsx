import { Outlet } from 'react-router';
import { AuthProvider } from '../utils/AuthProvider';
import { ModalProvider } from '../utils/ModalProvider';

// 프로젝트 레이아웃
const RootLayout = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </AuthProvider>
  );
};
export default RootLayout;
