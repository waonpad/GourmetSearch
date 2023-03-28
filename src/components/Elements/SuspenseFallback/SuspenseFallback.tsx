import { Backdrop, CircularProgress } from '@mui/material';

export const SuspenseFallback = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
};
