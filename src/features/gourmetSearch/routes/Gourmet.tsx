import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { Head } from '@/components/Head';

import { useGourmet } from '../api/getGourmet';
import { isHotpepperGourmetSuccessResponse } from '../types';

export const Gourmet = () => {
  const { shopId } = useParams();

  const gourmetQuery = useGourmet({ shopId });

  if (gourmetQuery.isLoading) {
    return <SuspenseFallback />;
  }

  if (!gourmetQuery.data) return null;

  return (
    <>
      {isHotpepperGourmetSuccessResponse(gourmetQuery.data) && (
        <>
          <Head title={gourmetQuery.data.results.shop[0].name} />
          <Box>
            <h1>{gourmetQuery.data.results.shop[0].name}</h1>
          </Box>
        </>
      )}
    </>
  );
};
