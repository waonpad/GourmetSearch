import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopListView } from './ShopList.view';

import type { ShopListProps } from './ShopList.types';

/**
 * エラー画面まだ作っていない
 */
export const ShopList = (props: ShopListProps) => {
  return (
    <FallbackWrapper>
      <ShopListView {...props} />
    </FallbackWrapper>
  );
};
