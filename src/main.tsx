import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//  프로바이더
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { RouterProvider } from 'react-router';

import router from './router/router.tsx';
import './shared/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 리액트 헬멧 */}
    <HelmetProvider>
      {/* 리액트 라우터 Data 셋팅 */}
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
