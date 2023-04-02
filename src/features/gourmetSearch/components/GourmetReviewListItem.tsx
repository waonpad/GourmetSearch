import { Card, CardHeader, Avatar, CardContent, Grid, Typography, Box } from '@mui/material';

import { RatingStars } from '@/components/Elements';
import { appTheme } from '@/styles/Theme';

type Review = google.maps.places.PlaceReview;

type GourmetReviewListItemProps = {
  review: Review;
};

const reviewRatingMax = 5;

export const GourmetReviewListItem = ({ review }: GourmetReviewListItemProps) => {
  return (
    <Card sx={{ width: '100%' }} square>
      <CardHeader
        title={review.author_name}
        titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
        subheader={
          <Box display="flex" alignItems="center" gap={1}>
            {review.rating && <RatingStars rating={review.rating} max={reviewRatingMax} />}
            <Typography variant="body2" color="text.secondary">
              {review.relative_time_description}
            </Typography>
          </Box>
        }
        avatar={<Avatar alt={review.author_name} src={review.profile_photo_url} />}
        action={<></>}
        sx={{
          [appTheme.breakpoints.down('md')]: {
            padding: appTheme.spacing(1),
          },
        }}
      />
      <CardContent
        sx={{ py: 0, '&:last-child': { pb: 2 }, [appTheme.breakpoints.down('md')]: { px: 1 } }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" whiteSpace="pre-wrap">
              {review.text}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
