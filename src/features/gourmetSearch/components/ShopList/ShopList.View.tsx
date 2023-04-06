import { Pagination, Typography, Grid, Container } from '@mui/material';

import { compositeStyle } from '@/styles/compositeStyle';
import { getTotalPages } from '@/utils/pagination';

import { FEATURE_CONSTANTS } from '../../constants';
import { isHotpepperGourmetSearchAPISuccessResponse } from '../../types';
import { ShopListItem } from '../ShopListItem';

import { CONSTANTS } from './ShopList.constants';
import { useLogics } from './ShopList.logics';
import { StyledShopListDivider, StyledShopListHeader } from './ShopList.styled';

import type { ShopListProps } from './ShopList.types';

export const ShopListView = ({ searchShopParams }: ShopListProps) => {
  const { shopsQuery, page, handleClickPaginte } = useLogics({ searchShopParams });

  const isExistShops =
    shopsQuery.data &&
    isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) &&
    shopsQuery.data.results.shop.length > 0;

  return (
    <Container>
      <Grid container spacing={1}>
        {isExistShops && isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) && (
          <>
            <Grid item xs={12}>
              <StyledShopListHeader>
                <Typography variant="h6">
                  {shopsQuery.data.results.results_available} {CONSTANTS.SHOP_LIST_RESULTS_LABEL}
                </Typography>
              </StyledShopListHeader>
            </Grid>
            <Grid item container spacing={{ xs: 0, md: 2 }}>
              {shopsQuery.data.results.shop.map((shop) => (
                <Grid item xs={12} key={shop.id}>
                  <StyledShopListDivider />
                  <ShopListItem shop={shop} />
                </Grid>
              ))}
            </Grid>
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
          </>
        )}
        {!isExistShops && (
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{CONSTANTS.SHOP_LIST_NO_RESULTS_LABEL}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
