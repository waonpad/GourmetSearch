import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'; // これのおかげでブラウザでクエリが簡単に確認できる

import { ErrorFallback } from '@/components/Elements/ErrorFallback';
import { SuspenseFallback } from '@/components/Elements/SuspenseFallback/SuspenseFallback';
import { Notifications } from '@/components/Notifications/Notifications';
import { FireAuthProvider } from '@/lib/fireAuth';
import { queryClient } from '@/lib/react-query';
import { ToastProvider } from '@/lib/react-toastify';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Notifications />
            <FireAuthProvider>
              <ToastProvider />
              <Router>{children}</Router>
            </FireAuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
