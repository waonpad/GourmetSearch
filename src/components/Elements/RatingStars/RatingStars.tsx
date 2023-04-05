import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Stack } from '@mui/material';

import type { StackProps, SvgIconProps } from '@mui/material';

export type RatingStarsProps = {
  rating: number;
  max: number;
  overrideProps?: {
    stack?: StackProps;
    filledStar?: SvgIconProps;
    emptyStar?: SvgIconProps;
  };
};

export const defaultRatingStarsProps: RatingStarsProps['overrideProps'] = {
  stack: {
    direction: 'row',
    gap: 0,
    alignItems: 'center',
  },
  filledStar: {},
  emptyStar: {},
};

export const RatingStars = ({
  rating,
  max,
  overrideProps = defaultRatingStarsProps,
}: RatingStarsProps) => {
  return (
    <Stack {...overrideProps.stack}>
      {[...Array(max)].map((_, i) =>
        i < rating ? (
          <StarIcon {...overrideProps.filledStar} key={i} />
        ) : (
          <StarBorderIcon {...overrideProps.emptyStar} key={i} />
        )
      )}
    </Stack>
  );
};
