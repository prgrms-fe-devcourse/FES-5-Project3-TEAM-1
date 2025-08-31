import { createBrowserRouter, type RouteObject } from 'react-router';
import { routes } from './routes';

const router = createBrowserRouter(routes as RouteObject[], {
  basename: import.meta.env.BASE_URL,
});

export default router;
export { routes };
