import ErrorIcon from '@mui/icons-material/Error';
import { Pagination, Typography, Grid, Container } from '@mui/material';

import { StyledCircularProgress, FallbackContainer } from '@/components/Elements';
import { GEOLOCATION_DISABLED } from '@/messages';
import { compositeStyle } from '@/styles/compositeStyle';
import { getTotalPages } from '@/utils/pagination';

import { FEATURE_CONSTANTS } from '../../constants';
import {
  isHotpepperAPIErrorResponse,
  isHotpepperGourmetSearchAPISuccessResponse,
} from '../../types';
import { ShopListItem } from '../ShopListItem';

import { CONSTANTS } from './ShopList.constants';
import { useLogics } from './ShopList.logics';
import { StyledShopListDivider, StyledShopListHeader } from './ShopList.styled';

import type { ShopListProps } from './ShopList.types';

export const ShopListView = ({ searchShopParams }: ShopListProps) => {
  const { shopsQuery, isShopsQueryEnabled, geolocated, page, handleClickPaginte } = useLogics({
    searchShopParams,
  });

  // Loading
  if (shopsQuery.isLoading || !isShopsQueryEnabled) {
    return <StyledCircularProgress />;
  }

  // GeoLocation Error
  if (
    (!geolocated?.isGeolocationAvailable || !geolocated?.isGeolocationEnabled) &&
    isHotpepperAPIErrorResponse(shopsQuery.data)
  ) {
    return (
      <FallbackContainer head={<ErrorIcon color="error" />} messages={[GEOLOCATION_DISABLED]} />
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

  return (
    <Container>
      <Grid container spacing={2}>
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
        {isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) &&
        shopsQuery.data?.results.shop.length ? (
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
                  shopsQuery.data.results.results_available,
                  searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
                )}
                page={page}
                onChange={handleClickPaginte}
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{CONSTANTS.SHOP_LIST_NO_RESULTS_LABEL}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
