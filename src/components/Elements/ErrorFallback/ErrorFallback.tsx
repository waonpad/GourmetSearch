import { Box, Button, Typography } from '@mui/material';

import type { FallbackProps } from 'react-error-boundary';

const message = 'Ooops, something went wrong :(';
const refresh = 'Refresh';

export const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {error ?? message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.assign(window.location.origin)}
      >
        {refresh}
      </Button>
    </Box>
  );
};
