import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Posts } = lazyImport(() => import('@/features/posts'), 'Posts');
const { MediaPosts } = lazyImport(() => import('@/features/mediaPosts'), 'MediaPosts');

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

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/posts', element: <Posts /> },
      { path: '/mediaPosts', element: <MediaPosts /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
