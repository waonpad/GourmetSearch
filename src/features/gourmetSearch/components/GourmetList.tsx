import { useNavigate } from 'react-router-dom';

import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import _ from 'lodash';
import qs from 'qs';
import { useGeolocated } from 'react-geolocated';

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
    requestParams: {
      ..._.omit(searchGourmetParams, ['allRange']),
      lat:
        searchGourmetParams?.allRange === 1
          ? undefined
          : searchGourmetParams?.lat ?? geolocated?.coords?.latitude,
      lng:
        searchGourmetParams?.allRange === 1
          ? undefined
          : searchGourmetParams?.lng ?? geolocated?.coords?.longitude,
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
      <Box sx={{ ...compositeStyle.centerBoth, my: 5 }}>
        <Typography variant="h6">{GEOLOCATION_DISABLED}</Typography>
      </Box>
    );
  }

  // Hotpepper Error
  if (isHotpepperErrorResponse(gourmetsQuery.data)) {
    return (
      <Box sx={{ ...compositeStyle.centerBoth, my: 5, gap: 2, flexDirection: 'column' }}>
        {gourmetsQuery.data.results.error.map((error) => (
          <Typography key={error.code} variant="h6">
            {error.message}
          </Typography>
        ))}
      </Box>
    );
  }

  // Success
  return (
    <>
      {isHotpepperGourmetSuccessResponse(gourmetsQuery.data) && (
        <>
          {gourmetsQuery.data.results.shop.map((shop) => (
            <GourmetListItem key={shop.id} shop={shop} />
          ))}
          <Box sx={{ mt: 5, mb: 5, ...compositeStyle.centerBoth }}>
            {gourmetsQuery.data.results.shop.length > 0 && (
              <Pagination
                count={getTotalPages(
                  gourmetsQuery.data.results.results_available,
                  searchGourmetParams?.count ?? defCount
                )}
                page={page}
                onChange={handleClickPaginte}
              />
            )}
            {gourmetsQuery.data.results.shop.length === 0 && (
              <Box sx={{ ...compositeStyle.centerBoth }}>
                <Typography variant="h6">No Results</Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};
