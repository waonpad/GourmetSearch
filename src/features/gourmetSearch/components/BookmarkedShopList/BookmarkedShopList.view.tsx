import { Container, Grid, Typography, Pagination } from '@mui/material';

import { StyledCircularProgress } from '@/components/Elements';
import { compositeStyle } from '@/styles/compositeStyle';
import { getTotalPages } from '@/utils/pagination';

import { FEATURE_CONSTANTS } from '../../constants';
import {
  isHotpepperAPIErrorResponse,
  isHotpepperGourmetSearchAPISuccessResponse,
} from '../../types';
import { CONSTANTS } from '../ShopList/ShopList.constants';
import { StyledShopListHeader, StyledShopListDivider } from '../ShopList/ShopList.styled';
import { ShopListItem } from '../ShopListItem';

import { useLogics } from './BookmarkedShopList.logics';

import type { BookmarkedShopListProps } from './BookmarkedShopList.types';

export const BookmarkedShopListView = ({ userId, start, count }: BookmarkedShopListProps) => {
  const { firestoreBookmarkedShopsQuery, shopsQuery, page, handleClickPaginte } = useLogics({
    userId,
    start,
    count,
  });

  // Loading
  if (shopsQuery.isLoading || firestoreBookmarkedShopsQuery.isLoading) {
    return <StyledCircularProgress />;
  }

  // Fetch Error
  if (!shopsQuery.data || !firestoreBookmarkedShopsQuery.data) {
    return null;
  }

  // Hotpepper Error
  if (isHotpepperAPIErrorResponse(shopsQuery.data)) {
    return (
      <Container>
        <Grid container spacing={2}>
          {shopsQuery.data.results.error.map((error) => (
            <Grid item xs={12} key={error.code} sx={{ ...compositeStyle.centerBoth }}>
              <Typography variant="h6">{error.message}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <StyledShopListHeader>
            <Typography variant="h6">
              {(isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data)
                ? shopsQuery.data.results.results_available
                : 0) +
                ' ' +
                CONSTANTS.SHOP_LIST_RESULTS_LABEL}
            </Typography>
          </StyledShopListHeader>
        </Grid>
        {isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) && (
          <>
            <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
              <Pagination
                count={getTotalPages(
                  shopsQuery.data.results.results_available,
                  count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
                )}
                page={page}
                onChange={handleClickPaginte}
              />
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
                  count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
                )}
                page={page}
                onChange={handleClickPaginte}
              />
            </Grid>
          </>
        )}
        {shopsQuery.data.results.shop.length === 0 && (
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{CONSTANTS.SHOP_LIST_NO_RESULTS_LABEL}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
