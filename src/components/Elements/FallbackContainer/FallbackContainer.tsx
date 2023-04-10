import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { compositeStyle } from '@/styles/compositeStyle';

type FallbackContainerProps = {
  head: React.ReactNode;
  messages: string[];
  overrideProps?: {
    message?: React.ComponentProps<typeof Typography>;
  };
};

const StyledTypography = styled(Typography)({});

StyledTypography.defaultProps = {
  variant: 'h6',
};

export const FallbackContainer = ({ head, messages, overrideProps }: FallbackContainerProps) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
          {head}
        </Grid>
        <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
          {messages.map((message) => (
            <Typography key={message} {...overrideProps?.message}>
              {message}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
