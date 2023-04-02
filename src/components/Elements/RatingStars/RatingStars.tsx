import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Stack } from '@mui/material';
import _ from 'lodash';

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

export const RatingStars = ({ rating, max, overrideProps }: RatingStarsProps) => {
  const assetProps = _.merge({}, defaultRatingStarsProps, overrideProps);

  return (
    <Stack {...assetProps.stack}>
      {[...Array(max)].map((_, i) =>
        i < rating ? (
          <StarIcon {...assetProps.filledStar} />
        ) : (
          <StarBorderIcon {...assetProps.emptyStar} />
        )
      )}
    </Stack>
  );
};
