import { useState } from 'react';

export const useLogics = () => {
  const [photoModalData, setPhotoModalData] = useState<google.maps.places.PlacePhoto | null>(null);

  const handlePhotoModalOpen = (photo: google.maps.places.PlacePhoto) => {
    setPhotoModalData(photo);
  };

  const handlePhotoModalClose = () => {
    setPhotoModalData(null);
  };

  return {
    photoModalData,
    handlePhotoModalOpen,
    handlePhotoModalClose,
  };
};
