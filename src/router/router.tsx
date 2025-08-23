import Home from '@/pages/Home';
import Showcase from '@/pages/Showcase';
import RootLayout from '@/RootLayout';
import { createBrowserRouter } from 'react-router';

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
