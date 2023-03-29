import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import qs from 'qs';

import { Head } from '@/components/Head';

import { GourmetList } from '../components/GourmetList';
import { SearchGourmetForm } from '../components/SearchGourmetForm';
import { hotpepperGourmetRequestConverter } from '../types';

import type { OmittedHotpepperGourmetRequest } from '../types';

export const Gourmets = () => {
  const { searchParams } = useParams();

  const parsedSearchParams: OmittedHotpepperGourmetRequest | undefined =
    hotpepperGourmetRequestConverter(qs.parse(searchParams));

  return (
    <>
      <Head title="Gourmets" />
      <Box key={searchParams}>
        <SearchGourmetForm defaultValues={parsedSearchParams} />
        <GourmetList SearchGourmetParams={parsedSearchParams} />
      </Box>
    </>
  );
};
