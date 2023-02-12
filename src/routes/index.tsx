import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { useFireAuth } from '@/lib/fireAuth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useFireAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
