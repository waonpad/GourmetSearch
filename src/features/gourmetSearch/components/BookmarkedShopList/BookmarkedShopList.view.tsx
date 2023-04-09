import ErrorIcon from '@mui/icons-material/Error';
import { Container, Grid, Typography, Pagination } from '@mui/material';

import { StyledCircularProgress, FallbackContainer } from '@/components/Elements';
import { compositeStyle } from '@/styles/compositeStyle';
import { getTotalPages } from '@/utils/pagination';

import { FEATURE_CONSTANTS } from '../../constants';
import {
  isHotpepperAPIErrorResponse,
  isHotpepperGourmetSearchAPISuccessResponse,
} from '../../types';
// import from ShopList
import { StyledShopListHeader, StyledShopListDivider } from '../ShopList/ShopList.styled';
import { ShopListItem } from '../ShopListItem';

import { CONSTANTS } from './BookmarkedShopList.constants';
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

  // user is not exist
  if (!firestoreBookmarkedShopsQuery.isExistUser) {
    return (
      <FallbackContainer
        head={<ErrorIcon color="error" />}
        messages={[CONSTANTS.USER_IS_NOT_EXIST_MESSAGE]}
      />
    );
  }

  // Firestore Error
  if (!firestoreBookmarkedShopsQuery.data) {
    return (
      <FallbackContainer
        head={<ErrorIcon color="error" />}
        messages={[CONSTANTS.GET_BOOKMARKED_SHOPS_ERROR_MESSAGE]}
      />
    );
  }

  // Hotpepper Error
  if (isHotpepperAPIErrorResponse(shopsQuery.data)) {
    return (
      <FallbackContainer
        head={<ErrorIcon color="error" />}
        messages={shopsQuery.data.results.error.map((error) => error.message)}
      />
    );
  }

  const shopTotalCount = firestoreBookmarkedShopsQuery.totalCount ?? 0;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledShopListHeader>
            <Typography variant="h6">
              {(isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) ? shopTotalCount : 0) +
                ' ' +
                CONSTANTS.BOOKMARKED_SHOP_LIST_RESULTS_LABEL}
            </Typography>
          </StyledShopListHeader>
        </Grid>
        {isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) &&
          shopsQuery.data?.results.shop.length && (
            <>
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
                    shopTotalCount,
                    count ?? FEATURE_CONSTANTS.GET_BOOKMARKED_SHOPS_DEDAULT_REQUEST_COUNT
                  )}
                  page={page}
                  onChange={handleClickPaginte}
                />
              </Grid>
            </>
          )}
        {shopTotalCount === 0 && (
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{CONSTANTS.BOOKMARKED_SHOP_LIST_NO_RESULTS_LABEL}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
