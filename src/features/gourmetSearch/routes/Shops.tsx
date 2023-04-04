import { useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';
import qs from 'qs';

import { Head } from '@/components/Head';

import { GourmetSearchAPIForm } from '../components/GourmetSearchAPIForm';
import { ShopList } from '../components/ShopList';
import { hotpepperGourmetSearchAPIRequestConverter } from '../types';

import type { CustomizedHotpepperGourmetSearchAPIRequest } from '../types';

export const Shops = () => {
  const { searchParams } = useParams();

  const parsedSearchParams: CustomizedHotpepperGourmetSearchAPIRequest | undefined =
    hotpepperGourmetSearchAPIRequestConverter(qs.parse(searchParams));

  return (
    <>
      <Head title="Shops" />
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
    </>
  );
};
