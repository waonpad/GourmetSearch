import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { ErrorFallback } from '@/components/Elements/ErrorFallback';
import { SuspenseFallback } from '@/components/Elements/SuspenseFallback/SuspenseFallback';
import { FireAuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/lib/react-toastify';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <FireAuthProvider>
            <ToastProvider />
            <Router>{children}</Router>
          </FireAuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
