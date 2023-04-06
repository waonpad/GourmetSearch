import { Modal, Typography } from '@mui/material';

import { getHrefFromAtag, getChildFromTag } from '@/utils/pattern';

import { CONSTANTS } from './ShopPlacePhotoModal.constants';
import {
  StyledPhotoModalContent,
  StyledPhotoModalImage,
  StyledPhotoModalImageDescBox,
} from './ShopPlacePhotoModal.styled';

import type { ShopPlacePhotoModalProps } from './ShopPlacePhotoModal.types';

export const ShopPlacePhotoModalView = ({ photo, open, onClose }: ShopPlacePhotoModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <StyledPhotoModalContent>
        <StyledPhotoModalImage src={photo.getUrl()} alt={'Shop'} loading="lazy" />
        {/* 投稿者の名前 */}
        <StyledPhotoModalImageDescBox>
          <Typography
            variant="body1"
            component={'a'}
            href={getHrefFromAtag(photo.html_attributions[0])}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CONSTANTS.PHOTO_AUTHOR_NAME_LABEL} {getChildFromTag(photo.html_attributions[0])}
          </Typography>
        </StyledPhotoModalImageDescBox>
      </StyledPhotoModalContent>
    </Modal>
  );
};
