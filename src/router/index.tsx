import { createBrowserRouter } from 'react-router';
import { routes } from './routes';

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
export { routes };
