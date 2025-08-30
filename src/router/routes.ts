import { lazy } from 'react';
import type { RouteConfig } from './type';
import RootLayout from '@/RootLayout';

// const Home = lazy(() => import('@/pages/Home'));
const Thread = lazy(() => import('@/pages/Thread'));
const LoginTest = lazy(() => import('@/pages/login-test/LoginTest'));
const AdminPage = lazy(() => import('@/pages/admin'));

export const routes: RouteConfig[] = [
  {
    text: 'Home',
    path: '/',
    Component: RootLayout,
    children: [
      {
        text: 'Thread',
        path: '/thread/:threadId',
        Component: Thread,
      },
      {
        text: 'Admin Page',
        path: '/admin',
        Component: AdminPage,
      },
      {
        text: '로그인 테스트',
        path: '/login',
        Component: LoginTest,
      },
    ],
  },
];
