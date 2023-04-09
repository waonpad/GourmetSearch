import { Link } from 'react-router-dom';

import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Container, Grid, Typography, Button } from '@mui/material';

import { Head } from '@/components/Head';
import { APP_NAME } from '@/config';
import { compositeStyle } from '@/styles/compositeStyle';

export const Landing = () => {
  return (
    <>
      <Head description={'Welcome to ' + APP_NAME} />
      <Container
        sx={{
          ...compositeStyle.centerBoth,
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" fontWeight={'bold'}>
              {APP_NAME}
            </Typography>
            <RestaurantIcon
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
              startIcon={<LocalDiningIcon />}
              endIcon={<LocalDiningIcon />}
            >
              {"Let's Find Some Food Free!"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
