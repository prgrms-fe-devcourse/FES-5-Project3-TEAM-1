import { lazy } from 'react';
import type { RouteConfig } from './type';
import RootLayout from '@/RootLayout';
import HomeLayout from '@/pages/Home/HomeLayout';
import HeaderLessLayout from '@/shared/layout/HeaderLessLayout';
import PageLayout from '@/shared/layout/PageLayout';

const Home = lazy(() => import('@/pages/Home'));
const Thread = lazy(() => import('@/pages/Thread'));
const LoginTest = lazy(() => import('@/pages/login-test/LoginTest'));
const AdminPage = lazy(() => import('@/pages/admin'));

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
          {
            text: '로그인 테스트',
            path: '/login',
            Component: LoginTest,
          },
        ],
      },
    ],
  },
];

// export const routes: RouteConfig[] = [
//   {
//     path: '/',
//     Component: RootLayout,
//     children: [
//       // HomeLayout을 사용하는 경로
//       {
//         path: '/',
//         Component: HomeLayout,
//         children: [
//           {
//             index: true,
//             Component: Home,
//           },
//         ],
//       },
//       // RootLayout의 직접적인 자식 경로들
//       {
//         path: '/thread/:threadId',
//         Component: Thread,
//         text: 'Thread',
//       },
//       {
//         path: '/admin',
//         Component: AdminPage,
//         text: 'Admin Page',
//       },
//       {
//         path: '/login',
//         Component: LoginTest,
//         text: '로그인 테스트',
//       },
//     ],
//   },
// ];
