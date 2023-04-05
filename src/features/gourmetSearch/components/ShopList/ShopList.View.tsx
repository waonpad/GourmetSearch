import { Pagination, Typography, Grid, Container, Divider, Box } from '@mui/material';

import { compositeStyle } from '@/styles/compositeStyle';
import { getTotalPages } from '@/utils/pagination';

import { FEATURE_CONSTANTS } from '../../constants';
import { isHotpepperGourmetSearchAPISuccessResponse } from '../../types';
import { ShopListItem } from '../ShopListItem';

import { useLogics } from './logics';

import type { ShopListProps } from './types';

export const ShopListView = ({ searchShopParams }: ShopListProps) => {
  const { shopsQuery, page, handleClickPaginte } = useLogics({ searchShopParams });

  // Success
  return (
    <Container>
      {shopsQuery.data && isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) && (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box px={{ xs: 1, md: 0 }}>
              <Typography variant="h6">
                {shopsQuery.data.results.results_available} Results
              </Typography>
            </Box>
          </Grid>
          <Grid item container spacing={{ xs: 0, md: 2 }}>
            {shopsQuery.data.results.shop.map((shop) => (
              <Grid item xs={12} key={shop.id}>
                <Divider sx={{ display: { xs: 'block', md: 'none' }, borderColor: 'inherit' }} />
                <ShopListItem shop={shop} />
              </Grid>
            ))}
          </Grid>
          <Grid item container spacing={0}>
            {shopsQuery.data.results.shop.length > 0 && (
              <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
                <Pagination
                  count={getTotalPages(
                    shopsQuery.data.results.results_available,
                    searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
                  )}
                  page={page}
                  onChange={handleClickPaginte}
                />
              </Grid>
            )}
            {shopsQuery.data.results.shop.length === 0 && (
              <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
                <Typography variant="h6">No Results</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
