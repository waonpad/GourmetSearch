import { Box, Button, Typography } from '@mui/material';

const message = 'Ooops, something went wrong :(';
const refresh = 'Refresh';

export const ErrorFallback = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {message}
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
