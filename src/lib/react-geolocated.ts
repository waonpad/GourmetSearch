import { useEffect, useState } from 'react';

import { useGeolocated as useGeolocatedOrigin } from 'react-geolocated';

import type { GeolocatedConfig } from 'react-geolocated';

export type UseGeolocatedOptions = {
  config?: GeolocatedConfig;
};

export const useGeolocated = ({ config }: UseGeolocatedOptions = {}) => {
  const geolocated = useGeolocatedOrigin(config);

  const [initialCoords, setInitialCoords] = useState<GeolocationCoordinates | undefined>(
    geolocated.coords
  );

  useEffect(() => {
    setInitialCoords((prev) => (prev === undefined ? geolocated.coords : prev));
  }, [geolocated.coords]);

  /**
   * true: if the geolocation is supported but not yet get the location
   */
  const isLoading =
    !geolocated.coords &&
    !initialCoords &&
    geolocated.isGeolocationAvailable &&
    geolocated.isGeolocationEnabled;

  /**
   * true: if the geolocation is not supported or the location is already got
   */
  const isStatusChecked =
    !!geolocated.coords ||
    !!initialCoords ||
    !geolocated.isGeolocationAvailable ||
    !geolocated.isGeolocationEnabled;

  return {
    ...geolocated,
    isLoading,
    isStatusChecked,
    initialCoords,
  };
};
