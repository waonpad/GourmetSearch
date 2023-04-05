import type { WrapperedComponentProps } from '@/lib/FallbackWrapper';
import { FallbackWrapper } from '@/lib/FallbackWrapper';

import { ShopListView } from './ShopList.View';

import type { ShopListProps } from './types';

type ExShopListProps = ShopListProps & WrapperedComponentProps;

/**
 * suspenseするかとかは外から決められない方がいいか？
 */
export const ShopList = ({
  suspense = true,
  susupenseFallback,
  errorFallback = true,
  FallbackComponent,
  ...props
}: ExShopListProps) => {
  return (
    <FallbackWrapper {...{ suspense, susupenseFallback, errorFallback, FallbackComponent }}>
      <ShopListView {...props} />
    </FallbackWrapper>
  );
};
