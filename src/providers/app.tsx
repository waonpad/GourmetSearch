import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';

import { ErrorFallback } from '@/components/Elements/ErrorFallback';
import { SuspenseFallback } from '@/components/Elements/SuspenseFallback/SuspenseFallback';
import { AuthProvider } from '@/lib/auth';
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
            <AuthProvider>
              <ToastProvider />
              <Router>{children}</Router>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
