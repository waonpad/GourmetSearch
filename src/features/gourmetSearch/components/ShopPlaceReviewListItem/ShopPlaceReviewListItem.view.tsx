import { Avatar, Grid, Typography } from '@mui/material';

import { RatingStars } from '@/components/Elements';

import { CONSTANTS } from './ShopPlaceReviewListItem.constants';
import {
  StyledReviewListItemCard,
  StyledReviewListItemCardHeader,
  StyledReviewListItemCardSubheader,
  StyledReviewListItemCardContent,
} from './ShopPlaceReviewListItem.styled';

import type { ShopPlaceReviewListItemProps } from './ShopPlaceReviewListItem.types';

export const ShopPlaceReviewListItemView = ({ review }: ShopPlaceReviewListItemProps) => {
  return (
    <StyledReviewListItemCard>
      <StyledReviewListItemCardHeader
        title={
          review.author_url ? (
            <a href={review.author_url} target="_blank" rel="noreferrer">
              {review.author_name}
            </a>
          ) : (
            review.author_name
          )
        }
        subheader={
          <StyledReviewListItemCardSubheader>
            {review.rating && (
              <RatingStars rating={review.rating} max={CONSTANTS.REVIEW_RATING_MAX} />
            )}
            <Typography variant="body2" color="text.secondary">
              {review.relative_time_description}
            </Typography>
          </StyledReviewListItemCardSubheader>
        }
        avatar={
          <Avatar
            alt={review.author_name}
            src={review.profile_photo_url}
            {...(review.author_url && {
              component: 'a',
              href: review.author_url,
              target: '_blank',
              rel: 'noreferrer',
            })}
          />
        }
      />
      <StyledReviewListItemCardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" whiteSpace="pre-wrap">
              {review.text}
            </Typography>
          </Grid>
        </Grid>
      </StyledReviewListItemCardContent>
    </StyledReviewListItemCard>
  );
};
