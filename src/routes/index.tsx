import { Suspense } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { MainLayout } from '@/components/Layout';
import { Landing } from '@/features/misc';
import { lazyImport } from '@/utils/lazyImport';

// import { ProtectedRoute } from './ProtectedRoute';
// import { PublicRoute } from './PublicRoute';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={CircularProgress}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<App />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/app" />} />
      </Route>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
