import Home from '@/pages/Home';
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
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
