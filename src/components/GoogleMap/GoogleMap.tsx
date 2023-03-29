import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { GoogleMap as ReactGoogleMaps, LoadScript, MarkerF, CircleF } from '@react-google-maps/api';
import _ from 'lodash';

import { GOOGLE_MAP_API_KEY } from '@/config';
import type { LatLng } from '@/types';

import type { SxProps } from '@mui/material';

type GoogleMapProps = {
  sx?: SxProps;
  defaultCenter?: LatLng;
  defaultZoom?: number;
  circleRadius?: number;
  changeLatLng?: (latLng: LatLng | undefined) => void;
  resetCenterTrigger?: boolean;
};

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

  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter()?.toJSON();
      if (newCenter && !_.isEqual(newCenter, center)) {
        setCenter(newCenter);
        changeLatLng?.(center);
      }
    }
  };

  /**
   * パラメータからdefaultCenterを取得している場合現在地に戻らない
   * そのようにする？
   */
  const resetCenter = () => {
    if (!defaultCenter) {
      return;
    }
    setCenter(defaultCenter);
    mapref?.setCenter(defaultCenter);
  };

  useEffect(() => {
    resetCenter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCenterTrigger]);

  return (
    <Box sx={{ ...sx, position: 'relative' }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
        <ReactGoogleMaps
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          center={center ?? defaultCenter}
          zoom={defaultZoom ?? 15}
          onLoad={handleOnLoad}
          onCenterChanged={handleCenterChanged}
        >
          <MarkerF visible={!!center} position={center ?? defaultCenter ?? { lat: 0, lng: 0 }} />
          <CircleF
            visible={!!center}
            center={center}
            radius={circleRadius ?? 0}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
            }}
          />
        </ReactGoogleMaps>
      </LoadScript>
    </Box>
  );
};
