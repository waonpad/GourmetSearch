import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { StyledCircularProgress } from '@/components/Elements';
import { compositeStyle } from '@/styles/compositeStyle';

import { ShopPlacePhotoModal } from '../ShopPlacePhotoModal';

import { CONSTANTS } from './ShopPlacePhotoList.constants';
import { useLogics } from './ShopPlacePhotoList.logics';
import { StyledPhotoListHeader, StyledPhotoListItemImage } from './ShopPlacePhotoList.styled';

import type { ShopPlacePhotoListProps } from './ShopPlacePhotoList.types';
import type { Theme } from '@mui/material';

export const ShopPlacePhotoListView = ({ photos, queryStatus }: ShopPlacePhotoListProps) => {
  const { findPlaceFromQuery, placeDetails } = queryStatus;

  const { photoModalData, handlePhotoModalOpen, handlePhotoModalClose } = useLogics();

  const isUpLarge = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(CONSTANTS.PHOTO_LIST_COLS_LARGE_BREAKPOINT)
  );
  const isUpMedium = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(CONSTANTS.PHOTO_LIST_COLS_MEDIUM_BREAKPOINT)
  );
  // const isUpSmall = useMediaQuery((theme: Theme) =>
  //   theme.breakpoints.up(CONSTANTS.PHOTO_LIST_COLS_SMALL_BREAKPOINT)
  // );

  // loading
  if (findPlaceFromQuery.isLoading || placeDetails.isLoading) {
    return <StyledCircularProgress />;
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

  const isExistPhotos = photos && photos.length > 0;

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
          <StyledPhotoListHeader>
            <Typography variant="h6">{CONSTANTS.PHOTO_LIST_RESULTS_LABEL}</Typography>
          </StyledPhotoListHeader>
        </Grid>
        {isExistPhotos && (
          <Grid item xs={12}>
            <ImageList
              gap={6}
              cols={
                isUpLarge
                  ? CONSTANTS.PHOTO_LIST_COLS_LARGE
                  : isUpMedium
                  ? CONSTANTS.PHOTO_LIST_COLS_MEDIUM
                  : CONSTANTS.PHOTO_LIST_COLS_SMALL
              }
            >
              {(photos as google.maps.places.PlacePhoto[]).map((photo) => (
                <ImageListItem key={photo.getUrl()} onClick={() => handlePhotoModalOpen(photo)}>
                  <StyledPhotoListItemImage
                    src={photo.getUrl()}
                    alt={'Shop'}
                    loading="lazy"
                    isRadius={isUpMedium}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        )}
        {!isExistPhotos && (
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{CONSTANTS.PHOTO_LIST_NO_RESULTS_LABEL}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
