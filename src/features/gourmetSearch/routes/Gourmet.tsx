import { useParams } from 'react-router-dom';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { Head } from '@/components/Head';

import { useGourmet } from '../api/getGourmet';

export const Gourmet = () => {
  const { shopId } = useParams();

  const gourmetQuery = useGourmet({ shopId });

  if (gourmetQuery.isLoading) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (!gourmetQuery.data) return null;

  return (
    <>
      <Head title={gourmetQuery.data.results.shop[0].name} />
      <Box>
        <h1>{gourmetQuery.data.results.shop[0].name}</h1>
      </Box>
    </>
  );
};
