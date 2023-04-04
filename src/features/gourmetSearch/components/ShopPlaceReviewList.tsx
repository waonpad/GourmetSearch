import { Fragment } from 'react';

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';

import { appTheme } from '@/styles/Theme';
import { compositeStyle } from '@/styles/compositeStyle';

import { ShopPlaceReviewListItem } from './ShopPlaceReviewListItem';

// import type { Shop } from '../types';
import type { ShopPlaceDetailsSupplierData } from './ShopPlaceDetailsSupplier';

type ShopReviewListProps = {
  // shop: Shop;
  reviews: google.maps.places.PlaceResult['reviews'];
  queryStatus: ShopPlaceDetailsSupplierData;
};

export const ShopPlaceReviewList = ({ reviews, queryStatus }: ShopReviewListProps) => {
  const { findPlaceFromQuery, placeDetails } = queryStatus;

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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box px={{ xs: 1, md: 0 }}>
            <Typography variant="h6">Reviews</Typography>
          </Box>
        </Grid>
        {reviews && (
          <Grid item xs={12}>
            <Card
              sx={{
                [appTheme.breakpoints.down('md')]: {
                  borderRadius: 0,
                },
              }}
            >
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <List disablePadding>
                  {reviews.map((review, index) => (
                    <Fragment key={review.author_name}>
                      <Divider
                        sx={{
                          [appTheme.breakpoints.up('md')]: {
                            display: index === 0 ? 'none' : 'block',
                          },
                          // WHY: 色が濃くなってしまう
                          // borderColor: 'inherit'で対応できない
                        }}
                      />
                      <ListItem sx={{ p: 0 }}>
                        <ShopPlaceReviewListItem review={review} />
                      </ListItem>
                    </Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item container spacing={0}>
          {(!reviews || reviews.length === 0) && (
            <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
              <Typography variant="h6">No Reviews</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
