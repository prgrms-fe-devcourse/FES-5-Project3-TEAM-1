import { lazy } from 'react';
import type { RouteConfig } from './type';
import RootLayout from '@/RootLayout';
import HomeLayout from '@/pages/Home/HomeLayout';

const Home = lazy(() => import('@/pages/Home'));
const Thread = lazy(() => import('@/pages/Thread'));
const LoginTest = lazy(() => import('@/pages/login-test/LoginTest'));
const AdminPage = lazy(() => import('@/pages/admin'));

export const routes: RouteConfig[] = [
  {
    text: '홈 레이아웃',
    path: '/',
    Component: HomeLayout,
    children: [
      {
        text: '홈',
        path: '/',
        Component: Home,
      },
    ],
  },
  {
    text: '페이지 레이아웃',
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
