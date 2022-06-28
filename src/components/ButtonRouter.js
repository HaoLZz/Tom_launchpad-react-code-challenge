import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  my: 1,
  display: 'block',
  color: 'inherit',
  '&:hover': {
    backgroundColor: alpha(blue[500], 0.8),
  },
}));

export default function ButtonRouter({ children, linkPath }) {
  return (
    <ColorButton component={RouterLink} to={linkPath}>
      {children}
    </ColorButton>
  );
}
