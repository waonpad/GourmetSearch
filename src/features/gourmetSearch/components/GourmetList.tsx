import { Box, CircularProgress } from '@mui/material';

import { useGourmets } from '../api/getGourmets';

import { GourmetListItem } from './GourmetListItem';

export const GourmetList = () => {
  const gourmetsQuery = useGourmets();

  if (gourmetsQuery.isLoading) {
    return (
      <Box sx={{ mt: 5, mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!gourmetsQuery.data) return null;

  return (
    <Box>
      {gourmetsQuery.data.results.shop.map((shop) => (
        <GourmetListItem key={shop.id} shop={shop} />
      ))}
    </Box>
  );
};
