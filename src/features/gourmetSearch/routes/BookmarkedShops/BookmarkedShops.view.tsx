import React from 'react';

import { Container, Grid } from '@mui/material';

import { Head } from '@/components/Head';

import { BookmarkedShopList } from '../../components/BookmarkedShopList';

import { CONSTANTS } from './BookmarkedShops.constants';
import { useLogics } from './BookmarkedShops.logics';

export const BookmarkedShopsView = () => {
  const { userId, start, count } = useLogics();

  return (
    <React.Fragment key={userId}>
      <Head title={CONSTANTS.PAGE_TITLE} />
      <Container
        sx={{
          paddingTop: 1,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <BookmarkedShopList userId={userId} start={start} count={count} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
