import Home from '@/pages/Home';
import Showcase from '@/pages/Showcase';
import ModalTest from '@/pages/ModalTest';
import RootLayout from '@/RootLayout';
import { createBrowserRouter } from 'react-router';
import Thread from '@/pages/Threads';

const routes = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        text: '홈',
        path: '/',
        Component: Home,
      },
      {
        text: '쓰레드',
        path: '/thread/:threadId',
        Component: Thread,
      },
      {
        text: '모달',
        path: '/modal',
        Component: ModalTest,
      },
      {
        text: '쇼 케이스',
        path: '/showcase',
        Component: Showcase,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
