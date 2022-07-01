import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostalSearchBar from './PostalSearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInfoByPostal } from './postalSlice';
import InfoPanel from './InfoPanel';
import MapContainer from './GoogleMap';

export default function PostalLookupPage() {
  const [searchInput, setSearchInput] = useState('');
  const [searchRequestStatus, setSearchRequestStatus] = useState('idle');
  const [error, setError] = useState(null);

  const data = useSelector((state) => state.postal.data);
  const dispatch = useDispatch();

  // Destructure longitude and latitude and construct a center object to pass down to map component
  const [{ longitude, latitude }] = data.places;
  const center = { lat: Number(latitude), lng: Number(longitude) };

  // Check if the input is ok to submit(US post code is a five-digit number)
  const canSubmit =
    searchInput.length === 5 &&
    !isNaN(searchInput) &&
    searchRequestStatus === 'idle';

  const onSubmit = async () => {
    if (canSubmit) {
      try {
        setSearchRequestStatus('pending');
        await dispatch(fetchInfoByPostal(searchInput)).unwrap();
        setSearchInput('');
        setError(null);
      } catch (err) {
        const error =
          err &&
          Object.keys(err).length === 0 &&
          Object.getPrototypeOf(err) === Object.prototype
            ? `404: Postal code ${searchInput} does not exist. Please search again.`
            : err.message;
        console.error(error);
        setError(error);
      } finally {
        setSearchRequestStatus('idle');
      }
    }
  };

  const contentToRender = !error ? (
    <>
      <InfoPanel data={data} />
      <MapContainer center={center} />
    </>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20vh',
      }}
    >
      <Typography
        variant="h5"
        component="p"
        color="#ef5350"
        textTransform="capitalize"
      >
        {error}
      </Typography>
    </Box>
  );

  return (
    <Container>
      <Typography
        variant="h2"
        component="h2"
        marginY={5}
        marginTop={5}
        gutterBottom
        textTransform="capitalize"
        sx={{
          fontSize: { xs: '1.5rem', md: '2.5rem' },
          fontWeight: '500',
          backgroundImage: 'radial-gradient(#553c9a, #ee4b2b)',
          color: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Postal Code Search
      </Typography>
      <PostalSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSubmit={onSubmit}
      />
      {contentToRender}
    </Container>
  );
}
