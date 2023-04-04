import { useNavigate } from 'react-router-dom';

import {
  CircularProgress,
  Pagination,
  Typography,
  Grid,
  Container,
  Divider,
  Box,
} from '@mui/material';
import _ from 'lodash';
import qs from 'qs';

import { useGeolocated } from '@/lib/react-geolocated';
import { GEOLOCATION_DISABLED } from '@/messages';
import { compositeStyle } from '@/styles/compositeStyle';
import { getOffset, getPage, getTotalPages } from '@/utils/pagination';

import { useShops, defCount, defStart } from '../api/getShops';
import { isHotpepperGourmetSearchAPISuccessResponse, isHotpepperAPIErrorResponse } from '../types';

import { ShopListItem } from './ShopListItem';

import type { CustomizedHotpepperGourmetSearchAPIRequest } from '../types';

type ShopListProps = {
  searchShopParams?: CustomizedHotpepperGourmetSearchAPIRequest;
};

export const ShopList = ({ searchShopParams }: ShopListProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated();

  const page = getPage(searchShopParams?.start ?? defStart, searchShopParams?.count ?? defCount);

  const shopsQuery = useShops({
    config: {
      enabled: !geolocated.isLoading || geolocated.isStatusChecked,
    },
    requestParams: {
      ..._.omit(searchShopParams, ['allRange']),
      lat:
        searchShopParams?.allRange === 1
          ? undefined
          : searchShopParams?.lat ?? geolocated.initialCoords?.latitude,
      lng:
        searchShopParams?.allRange === 1
          ? undefined
          : searchShopParams?.lng ?? geolocated?.initialCoords?.longitude,
      range: searchShopParams?.allRange === 1 ? undefined : searchShopParams?.range,
      start: getOffset(page, searchShopParams?.count ?? defCount) + 1,
    },
  });

  const handleClickPaginte = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(
      `/app/gourmet-search/shops/${qs.stringify({
        ...searchShopParams,
        start: getOffset(value, searchShopParams?.count ?? defCount) + 1,
      })}`
    );
  };

  // Loading
  if (shopsQuery.isLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 5 }} />;
  }

  // Fetch Error
  if (!shopsQuery.data) return null;

  // GeoLocation Error
  if (
    (!geolocated?.isGeolocationAvailable || !geolocated?.isGeolocationEnabled) &&
    isHotpepperAPIErrorResponse(shopsQuery.data)
  ) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{GEOLOCATION_DISABLED}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
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

  // Success
  return (
    <Container>
      {isHotpepperGourmetSearchAPISuccessResponse(shopsQuery.data) && (
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
                    searchShopParams?.count ?? defCount
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
