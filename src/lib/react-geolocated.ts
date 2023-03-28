import { useGeolocated as useGeolocatedOrigin } from 'react-geolocated';

export const useGeolocated = () => {
  const geolocated = useGeolocatedOrigin();

  return geolocated;
};
