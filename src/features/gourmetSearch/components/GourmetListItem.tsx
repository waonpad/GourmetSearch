import { Link } from '@/components/Elements';

import type { Shop } from '../types';

type GourmetListItemProps = {
  shop: Shop;
};

export const GourmetListItem = ({ shop }: GourmetListItemProps) => {
  return (
    <div>
      <Link to={`/app/gourmet-search/gourmet/${shop.id}`}>{shop.name}</Link>
    </div>
  );
};
