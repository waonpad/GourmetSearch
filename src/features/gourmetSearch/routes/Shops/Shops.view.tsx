import React from 'react';

import { Container, Grid } from '@mui/material';

import { Head } from '@/components/Head';

import { GourmetSearchAPIForm } from '../../components/GourmetSearchAPIForm';
import { ShopList } from '../../components/ShopList';

import { CONSTANTS } from './Shops.constants';
import { useLogics } from './Shops.logics';

export const ShopsView = () => {
  const { renderKey, parsedSearchParams } = useLogics();

  return (
    <React.Fragment key={renderKey}>
      <Head title={CONSTANTS.PAGE_TITLE} />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <GourmetSearchAPIForm defaultValues={parsedSearchParams} />
          </Grid>
          <Grid item xs={12}>
            <ShopList searchShopParams={parsedSearchParams} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
