import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function PostalLookupPage() {
  return (
    <Container>
      <Typography variant="h2" component="h2" marginY={5}>
        Postal Code Search
      </Typography>
      <div>SearchBar</div>
      <div>Map</div>
    </Container>
  );
}
