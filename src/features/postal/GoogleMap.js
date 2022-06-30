import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = ({
  zoom = 13,
  center = {
    lat: 41.3851,
    lng: 2.1734,
  },
}) => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={zoom} center={center} />
    </LoadScript>
  );
};

export default MapContainer;
