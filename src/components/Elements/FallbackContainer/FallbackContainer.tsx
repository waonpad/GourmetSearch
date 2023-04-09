import { Container, Grid, Typography } from '@mui/material';
import _ from 'lodash';

import { compositeStyle } from '@/styles/compositeStyle';

type FallbackContainerProps = {
  head: React.ReactNode;
  messages: string[];
  overrideProps?: {
    message?: React.ComponentProps<typeof Typography>;
  };
};

const FallbackContainerDefaultProps: FallbackContainerProps['overrideProps'] = {
  message: {
    variant: 'h6',
  },
};

export const FallbackContainer = ({ head, messages, overrideProps }: FallbackContainerProps) => {
  const assetProps = _.merge({}, FallbackContainerDefaultProps, overrideProps);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
          {head}
        </Grid>
        <Grid item xs={12} sx={{ ...compositeStyle.centerBoth }}>
          {messages.map((message) => (
            <Typography key={message} {...assetProps.message}>
              {message}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
