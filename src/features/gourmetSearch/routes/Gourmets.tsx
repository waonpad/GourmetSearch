import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import qs from 'qs';

import { Head } from '@/components/Head';

import { GourmetList } from '../components/GourmetList';
import { SearchGourmetForm } from '../components/SearchGourmetForm';

import type { HotpepperGourmetRequest } from '../types';

export const Gourmets = () => {
  const { query } = useParams();

  const parsedQuery: Omit<HotpepperGourmetRequest, 'key'> | undefined = qs.parse(query);

  return (
    <>
      <Head title="Gourmets" />
      <Box key={query}>
        <SearchGourmetForm defaultValues={parsedQuery} />
        <GourmetList SearchGourmetParams={parsedQuery} />
      </Box>
    </>
  );
};
