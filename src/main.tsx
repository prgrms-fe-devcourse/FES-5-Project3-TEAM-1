import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//  프로바이더
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { RouterProvider } from 'react-router';

import './shared/styles/global.css';
import { Toaster } from 'react-hot-toast';
import router from './router/index.tsx';
import ThemeManager from './features/dark-mode/ThemeManager.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeManager>
      {/* 리액트 헬멧 */}
      <HelmetProvider>
        {/* 리액트 라우터 Data 셋팅 */}
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeManager>
  </StrictMode>,
);
