import type { ReactElement } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';

import { useAuthContext } from '@/lib/auth';

type RouteProps = {
  element: ReactElement;
  path: string;
};

type From = {
  from: Location;
};

export const PublicRoute = ({ element, path }: RouteProps) => {
  const auth = useAuthContext();
  const location = useLocation();

  return (
    <Route
      path={path}
      element={
        auth?.user == null ? (
          element
        ) : (
          <Navigate
            to={(location.state as From) ? (location.state as From).from.pathname : '/'}
            state={{ from: location }}
          />
        )
      }
    />
  );
};
