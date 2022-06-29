import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostalSearchBar from './PostalSearchBar';

export default function PostalLookupPage() {
  const [searchInput, setSearchInput] = useState('');

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
        sx={{ paddingX: 2, paddingY: 1, marginBottom: '1.5rem' }}
      >
        <Box
          marginBottom={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" component="h3" noWrap>
            Postal Code
          </Typography>
        </Box>
        <Box marginBottom={1}>
          <Typography variant="subtitle1" component="span">
            Coutry + country abbreviation
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="p" overflow="hidden">
            "places": "place name": "Beverly Hills", "longitude": "-118.4065",
            "state": "California", "state abbreviation": "CA", "latitude":
            "34.0901"
          </Typography>
        </Box>
      </Paper>
      <div>Goople Map</div>
    </Container>
  );
}
