import { Suspense } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { MainLayout } from '@/components/Layout';
import { Landing } from '@/features/misc';
import { lazyImport } from '@/utils/lazyImport';

// import { ProtectedRoute } from './ProtectedRoute';
// import { PublicRoute } from './PublicRoute';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

// const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');

const { NotFound } = lazyImport(() => import('@/features/misc'), 'NotFound');

const { GourmetSearchRoutes } = lazyImport(
  () => import('@/features/gourmetSearch'),
  'GourmetSearchRoutes'
);

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<SuspenseFallback />}>
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
        <Route path="/" element={<Navigate to="/app/gourmet-search" />} />
        <Route path="/gourmet-search/*" element={<GourmetSearchRoutes />} />
      </Route>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
