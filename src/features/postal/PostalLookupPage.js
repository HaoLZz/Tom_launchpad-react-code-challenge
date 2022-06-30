import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PostalSearchBar from './PostalSearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInfoByPostal } from './postalSlice';
import { Spinner } from '../../components/Spinner';
import InfoPanel from './InfoPanel';
import MapContainer from './GoogleMap';

export default function PostalLookupPage() {
  const [searchInput, setSearchInput] = useState('');
  const data = useSelector((state) => state.postal.data);
  const postalStatus = useSelector((state) => state.postal.status);
  const error = useSelector((state) => state.postal.error);
  const dispatch = useDispatch();

  // Destructure longitude and latitude and construct a center object to pass down to map component
  const [{ longitude, latitude }] = data.places;
  const center = { lat: Number(latitude), lng: Number(longitude) };

  const onSubmit = () => {
    // Check if the input is ok to submit(US post code is a five-digit number)
    const canSubmit =
      searchInput.length === 5 &&
      !isNaN(searchInput) &&
      ['idle', 'succeeded'].includes(postalStatus);
    if (canSubmit) {
      dispatch(fetchInfoByPostal(searchInput));
    }
  };

  let contentToRender;

  if (postalStatus === 'loading') {
    contentToRender = <Spinner />;
  } else if (postalStatus === 'failed') {
    contentToRender = <div>{error}</div>;
  } else {
    contentToRender = <InfoPanel data={data} />;
  }

  return (
    <Container>
      <Typography variant="h2" component="h2" marginY={5}>
        Postal Code Search
      </Typography>
      <PostalSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSubmit={onSubmit}
      />
      {contentToRender}
      <MapContainer center={center} />
    </Container>
  );
}
