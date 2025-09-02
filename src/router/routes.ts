import { lazy } from 'react';
import type { RouteConfig } from './type';
import HeaderLessLayout from '@/shared/layout/HeaderLessLayout';
import PageLayout from '@/shared/layout/PageLayout';
import RootLayout from '@/shared/layout/RootLayout';

const Home = lazy(() => import('@/pages/Home'));
const Thread = lazy(() => import('@/pages/Thread'));
const AdminPage = lazy(() => import('@/pages/admin'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const routes: RouteConfig[] = [
  {
    text: '전체 레이아웃',
    path: '/',
    Component: RootLayout,
    children: [
      {
        text: '헤더리스 레이아웃',
        path: '/',
        Component: HeaderLessLayout,
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
        Component: PageLayout,
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
        ],
      },
      {
        text: '404 페이지',
        path: '*',
        Component: NotFound,
      },
    ],
  },
];
