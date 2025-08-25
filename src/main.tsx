import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//  프로바이더
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './shared/utils/LoginAuth.tsx';

import router from './router/router.tsx';
import './shared/styles/global.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 리액트 헬멧 */}
    <AuthProvider>
      <HelmetProvider>
        {/* 리액트 라우터 Data 셋팅 */}
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
);
