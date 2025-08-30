import Home from '@/pages/Home';
import RootLayout from '@/RootLayout';
import LoginTest from '@/pages/login-test/LoginTest';
import { createBrowserRouter } from 'react-router';
import Thread from '@/pages/Thread';
import AdminPage from '@/pages/admin';
import HomeLayout from '@/pages/Home/HomeLayout';

const routes = [
  {
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
    path: '/',
    Component: RootLayout,
    children: [
      {
        text: '쓰레드',
        path: '/thread/:threadId',
        Component: Thread,
      },
      {
        text: '로그인 테스트',
        path: '/login',
        Component: LoginTest,
      },
      {
        text: '관리자 페이지',
        path: '/admin',
        Component: AdminPage,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
