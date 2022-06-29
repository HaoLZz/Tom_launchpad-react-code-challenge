import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceIcon from '@mui/icons-material/Place';
import MapIcon from '@mui/icons-material/Map';
import PostalSearchBar from './PostalSearchBar';

import { useSelector, useDispatch } from 'react-redux';

export default function PostalLookupPage() {
  const [searchInput, setSearchInput] = useState('');
  const data = useSelector((state) => state.postal.data);
  const [place] = data.places;

  return (
    <Container>
      <Typography variant="h2" component="h2" marginY={5}>
        Postal Code Search
      </Typography>
      <PostalSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Paper
        elevation={3}
        sx={{ paddingX: 3, paddingY: 2, marginBottom: '1.5rem' }}
      >
        <Box
          marginBottom={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <MailOutlineIcon fontSize="large" />
          <Typography variant="h5" component="h3">
            {data['post code']}
          </Typography>
        </Box>
        <Box
          marginBottom={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <PublicIcon fontSize="large" />
          <Typography variant="subtitle1" component="span">
            {`${data.country} (${data['country abbreviation']})`}
          </Typography>
        </Box>
        <Box
          marginBottom={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <PlaceIcon fontSize="large" />
          <Typography variant="body1" component="p" overflow="hidden">
            {`${place['place name']} , ${place.state}(${place['state abbreviation']})`}
          </Typography>
        </Box>
        <Box
          marginBottom={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <MapIcon fontSize="large" />
          <Typography variant="body1" component="p" overflow="hidden">
            {`Long. ${place.longitude} , Lat. ${place.latitude}`}
          </Typography>
        </Box>
      </Paper>
      <div>Goople Map</div>
    </Container>
  );
}
