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

import { useGourmets, defCount, defStart } from '../api/getGourmets';
import { isHotpepperGourmetSuccessResponse, isHotpepperErrorResponse } from '../types';

import { GourmetListItem } from './GourmetListItem';

import type { CustomizedHotpepperGourmetRequest } from '../types';

type GourmetListProps = {
  searchGourmetParams?: CustomizedHotpepperGourmetRequest;
};

export const GourmetList = ({ searchGourmetParams }: GourmetListProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated();

  const page = getPage(
    searchGourmetParams?.start ?? defStart,
    searchGourmetParams?.count ?? defCount
  );

  const gourmetsQuery = useGourmets({
    config: {
      enabled: !geolocated.isLoading || geolocated.isStatusChecked,
    },
    requestParams: {
      ..._.omit(searchGourmetParams, ['allRange']),
      lat:
        searchGourmetParams?.allRange === 1
          ? undefined
          : searchGourmetParams?.lat ?? geolocated.initialCoords?.latitude,
      lng:
        searchGourmetParams?.allRange === 1
          ? undefined
          : searchGourmetParams?.lng ?? geolocated?.initialCoords?.longitude,
      range: searchGourmetParams?.allRange === 1 ? undefined : searchGourmetParams?.range,
      start: getOffset(page, searchGourmetParams?.count ?? defCount) + 1,
    },
  });

  const handleClickPaginte = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(
      `/app/gourmet-search/gourmets/${qs.stringify({
        ...searchGourmetParams,
        start: getOffset(value, searchGourmetParams?.count ?? defCount) + 1,
      })}`
    );
  };

  // Loading
  if (gourmetsQuery.isLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 5 }} />;
  }

  // Fetch Error
  if (!gourmetsQuery.data) return null;

  // GeoLocation Error
  if (
    (!geolocated?.isGeolocationAvailable || !geolocated?.isGeolocationEnabled) &&
    isHotpepperErrorResponse(gourmetsQuery.data)
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
  if (isHotpepperErrorResponse(gourmetsQuery.data)) {
    return (
      <Container>
        <Grid container spacing={2}>
          {gourmetsQuery.data.results.error.map((error) => (
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
      {isHotpepperGourmetSuccessResponse(gourmetsQuery.data) && (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box px={{ xs: 1, md: 0 }}>
              <Typography variant="h6">
                {gourmetsQuery.data.results.results_available} Results
              </Typography>
            </Box>
          </Grid>
          <Grid item container spacing={{ xs: 0, md: 2 }}>
            {gourmetsQuery.data.results.shop.map((shop) => (
              <Grid item xs={12} key={shop.id}>
                <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
                <GourmetListItem shop={shop} />
              </Grid>
            ))}
          </Grid>
          <Grid item container spacing={0}>
            {gourmetsQuery.data.results.shop.length > 0 && (
              <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
                <Pagination
                  count={getTotalPages(
                    gourmetsQuery.data.results.results_available,
                    searchGourmetParams?.count ?? defCount
                  )}
                  page={page}
                  onChange={handleClickPaginte}
                />
              </Grid>
            )}
            {gourmetsQuery.data.results.shop.length === 0 && (
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
