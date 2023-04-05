import type { SuspenseProps } from 'react';
import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { StyledCircularProgress } from '@/components/Elements';
import { ErrorFallback } from '@/components/Elements/ErrorFallback';

import type { FallbackProps } from 'react-error-boundary';

export type FallbackWrapperProps = {
  suspenseFallback?: SuspenseProps['fallback'];
  errorFallback?: React.ComponentType<FallbackProps>;
  children?: JSX.Element;
};

export type WrapperedComponentProps = Omit<FallbackWrapperProps, 'children'>;

export const FallbackWrapper = ({
  suspenseFallback = <StyledCircularProgress />,
  errorFallback = ErrorFallback,
  children: Component,
}: FallbackWrapperProps) => {
  if (errorFallback && suspenseFallback) {
    return (
      <Suspense fallback={suspenseFallback}>
        <ErrorBoundary FallbackComponent={errorFallback}>{Component}</ErrorBoundary>
      </Suspense>
    );
  }

  if (suspenseFallback) {
    return <Suspense fallback={suspenseFallback}>{Component}</Suspense>;
  }

  if (errorFallback) {
    return <ErrorBoundary FallbackComponent={errorFallback}>{Component}</ErrorBoundary>;
  }

  return Component ?? null;
};
