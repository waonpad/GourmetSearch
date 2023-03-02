import { Suspense } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { Landing } from '@/features/misc';
import { lazyImport } from '@/utils/lazyImport';

import { ProtectedRoute } from './ProtectedRoute';
// import { PublicRoute } from './PublicRoute';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Posts } = lazyImport(() => import('@/features/posts'), 'Posts');
const { MediaPosts } = lazyImport(() => import('@/features/mediaPosts'), 'MediaPosts');

const { GameClipRoutes } = lazyImport(() => import('@/features/game-clip'), 'GameClipRoutes');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
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
        <ProtectedRoute path="/posts" element={<Posts />} />
        <ProtectedRoute path="/mediaPosts" element={<MediaPosts />} />
        <ProtectedRoute path="/gameClips" element={<GameClipRoutes />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/app" />} />
      </Route>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
