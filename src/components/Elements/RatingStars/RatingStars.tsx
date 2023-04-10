import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const StyledStack = styled(Stack)({});

StyledStack.defaultProps = {
  direction: 'row',
  gap: 0,
  alignItems: 'center',
};

export const RatingStars = ({ rating, max, overrideProps }: RatingStarsProps) => {
  return (
    <StyledStack {...overrideProps?.stack}>
      {[...Array(max)].map((_, i) =>
        i < rating ? (
          <StarIcon {...overrideProps?.filledStar} key={i} />
        ) : (
          <StarBorderIcon {...overrideProps?.emptyStar} key={i} />
        )
      )}
    </StyledStack>
  );
};
