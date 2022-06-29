import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUniversities } from './universitiesSlice';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UniversitiesPage() {
  const universities = useSelector(selectAllUniversities);

  return (
    <Container>
      <Box sx={{ width: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          {universities.map((university) => {
            return (
              <Box gridColumn="span 4" key={university.name}>
                <Item>{university.name}</Item>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
