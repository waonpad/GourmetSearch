import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { compositeStyle } from '@/styles/compositeStyle';

export const StyledPhotoModalContent = styled(Box)(({ theme }) => ({
  ...compositeStyle.absoluteCenterBoth,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '24px',
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
  maxWidth: '90vw',
  maxHeight: '90vh',
}));

export const StyledPhotoModalImage = styled('img')(({ theme }) => ({
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  maxWidth: '90vw',
  maxHeight: 'calc(90vh - 48px)',
}));

export const StyledPhotoModalImageDescBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderBottomLeftRadius: theme.shape.borderRadius,
  borderBottomRightRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));
