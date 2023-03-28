import type { Shop } from '../types';

type GourmetListItemProps = {
  shop: Shop;
};

export const GourmetListItem = ({ shop }: GourmetListItemProps) => {
  return (
    <div>
      <h2>{shop.name}</h2>
    </div>
  );
};
