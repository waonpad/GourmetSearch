import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { DiscussionsRoutes } = lazyImport(
  () => import('@/features/discussions'),
  'DiscussionsRoutes'
);
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
const { Users } = lazyImport(() => import('@/features/users'), 'Users');
const { Posts } = lazyImport(() => import('@/features/posts'), 'Posts');
const { MediaPosts } = lazyImport(() => import('@/features/mediaPosts'), 'MediaPosts');
const { Storage } = lazyImport(() => import('@/features/storage'), 'Storage');

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
      { path: '/discussions/*', element: <DiscussionsRoutes /> },
      { path: '/users', element: <Users /> },
      { path: '/profile', element: <Profile /> },
      { path: '/posts', element: <Posts /> },
      { path: '/mediaPosts', element: <MediaPosts /> },
      { path: '/storage', element: <Storage /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
