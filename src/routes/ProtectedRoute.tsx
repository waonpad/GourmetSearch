import type { ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { useAuthContext } from '@/lib/auth';

type RouteProps = {
  element: ReactElement;
  path: string;
};

export const ProtectedRoute = ({ element, path }: RouteProps) => {
  const auth = useAuthContext();

  return (
    <Route
      path={path}
      element={
        auth?.user == null ? <Navigate to="/auth/login" state={{ from: location }} /> : element
      }
    />
  );
};
