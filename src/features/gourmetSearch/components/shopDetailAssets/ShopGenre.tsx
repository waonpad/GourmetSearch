import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Stack, Chip } from '@mui/material';

import { StyledStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopGenre = ({ shop }: { shop: Shop }) => {
  return (
    <StyledStack>
      <RestaurantIcon />
      <Stack direction="row" flexWrap={'wrap'} gap={0.5}>
        <Chip label={shop.genre.name} size="small" />
        {shop.sub_genre && <Chip label={shop.sub_genre.name} size="small" />}
      </Stack>
    </StyledStack>
  );
};
