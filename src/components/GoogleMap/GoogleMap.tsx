import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { GoogleMap as ReactGoogleMaps, MarkerF, CircleF } from '@react-google-maps/api';
import _ from 'lodash';

import { useGeolocated } from '@/lib/react-geolocated';
import type { LatLng } from '@/types';

import type { SxProps } from '@mui/material';

export type GoogleMapProps = {
  sx?: SxProps;
  defaultCenter?: LatLng;
  defaultZoom?: number;
  circleRadius?: number;
  changeLatLng?: (latLng: LatLng | undefined) => void;
  resetCenterTrigger?: boolean;
};

const tokyoLatLng = {
  lat: 35.681236,
  lng: 139.767125,
};

const spareDefaultCenter: LatLng = tokyoLatLng;

export const GoogleMap = ({
  sx,
  defaultCenter,
  defaultZoom,
  circleRadius,
  changeLatLng,
  resetCenterTrigger,
}: GoogleMapProps) => {
  const [mapref, setMapRef] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<LatLng | undefined>(defaultCenter);

  const geolocated = useGeolocated({
    config: {
      watchPosition: true,
    },
  });

  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
    changeLatLng?.(map.getCenter()?.toJSON());
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter()?.toJSON();

      if (newCenter && !_.isEqual(newCenter, center)) {
        setCenter(newCenter);
        changeLatLng?.(newCenter);
      }
    }
  };

  const resetCenter = () => {
    // 取得出来なければdefaultCenter, spareDefaultCenterにする？
    if (geolocated?.coords) {
      const latLng = {
        lat: geolocated.coords.latitude,
        lng: geolocated.coords.longitude,
      };

      setCenter(latLng);
      mapref?.setCenter(latLng);
    }
  };

  useEffect(() => {
    resetCenter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCenterTrigger]);

  return (
    <Box sx={{ ...sx, position: 'relative' }}>
      {/* <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}> */}
      <ReactGoogleMaps
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        center={center ?? defaultCenter ?? spareDefaultCenter}
        zoom={defaultZoom ?? 15}
        onLoad={handleOnLoad}
        onCenterChanged={handleCenterChanged}
      >
        <MarkerF position={center ?? defaultCenter ?? spareDefaultCenter} />
        <CircleF
          center={center ?? defaultCenter ?? spareDefaultCenter}
          radius={circleRadius ?? 0}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.2,
          }}
        />
      </ReactGoogleMaps>
      {/* </LoadScript> */}
    </Box>
  );
};
