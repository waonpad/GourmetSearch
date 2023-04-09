import { Link } from 'react-router-dom';

import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { Button, Container, Grid, Typography } from '@mui/material';

import { compositeStyle } from '@/styles/compositeStyle';

export const NotFound = () => {
  return (
    <Container
      sx={{
        ...compositeStyle.centerBoth,
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography fontWeight={'bold'} variant="h5">
            404 Error: Page Not Found.
          </Typography>
          <RamenDiningIcon
            sx={{
              fontSize: 200,
              color: 'primary.main',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/app/gourmet-search"
            size="large"
          >
            {'Back to Home'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
