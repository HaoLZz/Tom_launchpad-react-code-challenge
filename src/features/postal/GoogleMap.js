import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Paper } from '@mui/material';

const MapContainer = ({
  zoom = 13,
  center = {
    lat: 29.6132,
    lng: -82.3873,
  },
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const containerStyle = {
    height: '50vh',
    width: '100%',
  };

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <Paper elevation={3} sx={{ padding: 1 }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
      </GoogleMap>
    </Paper>
  ) : (
    <></>
  );
};

export default React.memo(MapContainer);
