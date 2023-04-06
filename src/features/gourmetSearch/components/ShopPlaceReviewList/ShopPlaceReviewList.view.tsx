import { Fragment } from 'react';

import { Container, Grid, List, ListItem, Typography } from '@mui/material';

import { StyledCircularProgress } from '@/components/Elements';
import { compositeStyle } from '@/styles/compositeStyle';

import { ShopPlaceReviewListItem } from '../ShopPlaceReviewListItem';

import { CONSTANTS } from './ShopPlaceReviewList.constants';
import {
  StyledReviewListCard,
  StyledReviewListCardContent,
  StyledReviewListDivider,
  StyledReviewListHeader,
} from './ShopPlaceReviewList.styled';

import type { ShopPlaceReviewListProps } from './ShopPlaceReviewList.types';

export const ShopPlaceReviewListView = ({ reviews, queryStatus }: ShopPlaceReviewListProps) => {
  const { findPlaceFromQuery, placeDetails } = queryStatus;

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

  const isExistReviews = reviews && reviews.length > 0;

  return (
    <Container sx={{ py: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <StyledReviewListHeader>
            <Typography variant="h6">{CONSTANTS.REVIEW_LIST_RESULTS_LABEL}</Typography>
          </StyledReviewListHeader>
        </Grid>
        {isExistReviews && (
          <Grid item xs={12}>
            <StyledReviewListCard>
              <StyledReviewListCardContent>
                <List disablePadding>
                  {(reviews as google.maps.places.PlaceReview[]).map((review, index) => (
                    <Fragment key={review.author_name}>
                      <StyledReviewListDivider isFirst={index === 0} />
                      <ListItem disablePadding>
                        <ShopPlaceReviewListItem review={review} />
                      </ListItem>
                    </Fragment>
                  ))}
                </List>
              </StyledReviewListCardContent>
            </StyledReviewListCard>
          </Grid>
        )}
        {!isExistReviews && (
          <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
            <Typography variant="h6">{CONSTANTS.REVIEW_LIST_NO_RESULTS_LABEL}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
