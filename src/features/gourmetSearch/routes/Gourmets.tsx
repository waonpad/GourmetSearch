import { useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';
import qs from 'qs';

import { Head } from '@/components/Head';

import { GourmetList } from '../components/GourmetList';
import { SearchGourmetForm } from '../components/SearchGourmetForm';
import { hotpepperGourmetRequestConverter } from '../types';

import type { CustomizedHotpepperGourmetRequest } from '../types';

export const Gourmets = () => {
  const { searchParams } = useParams();

  const parsedSearchParams: CustomizedHotpepperGourmetRequest | undefined =
    hotpepperGourmetRequestConverter(qs.parse(searchParams));

  return (
    <>
      <Head title="Gourmets" />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SearchGourmetForm defaultValues={parsedSearchParams} />
          </Grid>
          <Grid item xs={12}>
            <GourmetList searchGourmetParams={parsedSearchParams} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
