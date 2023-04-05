import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopListItemView } from './ShopListItem.view';

import type { ShopListItemProps } from './ShopListItem.types';

/**
 * エラー画面まだ作っていない
 */
export const ShopListItem = (props: ShopListItemProps) => {
  return (
    <FallbackWrapper>
      <ShopListItemView {...props} />
    </FallbackWrapper>
  );
};
