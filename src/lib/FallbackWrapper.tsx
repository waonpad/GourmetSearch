import type { SuspenseProps } from 'react';
import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { StyledCircularProgress } from '@/components/Elements';
import { ErrorFallback } from '@/components/Elements/ErrorFallback';

import type { FallbackProps } from 'react-error-boundary';

export type FallbackWrapperProps = {
  suspense?: boolean;
  susupenseFallback?: SuspenseProps['fallback'];
  errorFallback?: boolean;
  FallbackComponent?: React.ComponentType<FallbackProps>;
  children?: JSX.Element;
};

export type WrapperedComponentProps = Omit<FallbackWrapperProps, 'children'>;

export const FallbackWrapper = ({
  suspense = true,
  susupenseFallback = <StyledCircularProgress />,
  errorFallback = true,
  FallbackComponent = ErrorFallback,
  children: Component,
}: FallbackWrapperProps) => {
  if (errorFallback && suspense) {
    return (
      <Suspense fallback={susupenseFallback}>
        <ErrorBoundary FallbackComponent={FallbackComponent}>{Component}</ErrorBoundary>
      </Suspense>
    );
  }

  if (suspense) {
    return <Suspense fallback={susupenseFallback}>{Component}</Suspense>;
  }

  if (errorFallback) {
    return <ErrorBoundary FallbackComponent={FallbackComponent}>{Component}</ErrorBoundary>;
  }

  return Component ?? null;
};
