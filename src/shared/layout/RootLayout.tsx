import { Outlet } from 'react-router';
import { AuthProvider } from '../utils/AuthProvider';
import { ModalProvider } from '../utils/ModalProvider';
import ThemeManager from '@/features/dark-mode/ThemeManager';

// 프로젝트 레이아웃
const RootLayout = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ThemeManager>
          <Outlet />
        </ThemeManager>
      </ModalProvider>
    </AuthProvider>
  );
};
export default RootLayout;
