import { useState } from 'react';

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { appTheme } from '@/styles/Theme';
import { compositeStyle } from '@/styles/compositeStyle';

import { ShopPlacePhotoModal } from './ShopPlacePhotoModal';

import type { ShopPlaceDetailsSupplierData } from './ShopPlaceDetailsSupplier';
import type { Theme } from '@mui/material';

type ShopPlacePhotoListProps = {
  photos: google.maps.places.PlaceResult['photos'];
  queryStatus: ShopPlaceDetailsSupplierData;
};

export const ShopPlacePhotoList = ({ photos, queryStatus }: ShopPlacePhotoListProps) => {
  const { findPlaceFromQuery, placeDetails } = queryStatus;

  const isUpLmd = useMediaQuery((theme: Theme) => theme.breakpoints.up('lmd'));
  const isUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const isUpSmd = useMediaQuery((theme: Theme) => theme.breakpoints.up('smd'));

  const [photoModalData, setPhotoModalData] = useState<google.maps.places.PlacePhoto | null>(null);

  const handlePhotoModalOpen = (photo: google.maps.places.PlacePhoto) => {
    setPhotoModalData(photo);
  };

  const handlePhotoModalClose = () => {
    setPhotoModalData(null);
  };

  // loading
  if (findPlaceFromQuery.isLoading || placeDetails.isLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 5 }} />;
  }

  // findPlaceFromQuery error
  if (findPlaceFromQuery.isError || !findPlaceFromQuery.data) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{findPlaceFromQuery.serviceStatus}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  // placeDetails error
  if (placeDetails.isError || !placeDetails.data) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{placeDetails.serviceStatus}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  // success
  return (
    <Container sx={{ py: 2 }}>
      {photoModalData && (
        <ShopPlacePhotoModal
          photo={photoModalData}
          open={!!photoModalData}
          onClose={handlePhotoModalClose}
        />
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box px={{ xs: 1, md: 0 }}>
            <Typography variant="h6">Photos</Typography>
          </Box>
        </Grid>
        {photos && (
          <Grid item xs={12}>
            <ImageList gap={6} cols={isUpLmd ? 6 : isUpSmd ? 5 : 4}>
              {photos.map((photo) => (
                <ImageListItem key={photo.getUrl()} onClick={() => handlePhotoModalOpen(photo)}>
                  <img
                    src={photo.getUrl()}
                    alt={'Shop'}
                    loading="lazy"
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: isUpMd ? appTheme.shape.borderRadius : 0,
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        )}
        {(!photos || photos.length === 0) && (
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">No Photos</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
