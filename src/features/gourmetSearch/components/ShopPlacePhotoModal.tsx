import { Modal, Box, Typography } from '@mui/material';

import { appTheme } from '@/styles/Theme';
import { compositeStyle } from '@/styles/compositeStyle';

export type ShopPlacePhotoModalProps = {
  photo: google.maps.places.PlacePhoto;
  open: boolean;
  onClose: () => void;
};

const modalBorderRadius = appTheme.shape.borderRadius;

export const ShopPlacePhotoModal = ({ photo, open, onClose }: ShopPlacePhotoModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...compositeStyle.absoluteCenterBoth,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: `${modalBorderRadius}px`,
          width: 'fit-content',
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
      >
        <img
          src={photo.getUrl()}
          alt={'Shop'}
          loading="lazy"
          style={{
            borderTopLeftRadius: modalBorderRadius,
            borderTopRightRadius: modalBorderRadius,
            maxWidth: '90vw',
            maxHeight: 'calc(90vh - 48px)',
          }}
        />
        {/* 投稿者の名前 */}
        <Box
          sx={{
            p: 1.5,
            borderBottomLeftRadius: modalBorderRadius,
            borderBottomRightRadius: modalBorderRadius,
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="body1"
            component={'a'}
            href={photo.html_attributions[0].match(/href="(.+?)"/)?.[1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            by: {photo.html_attributions[0].match(/>(.+?)</)?.[1]}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
