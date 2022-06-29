import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUniversities } from './universitiesSlice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UniversityCard from './UniversityCard';

export default function UniversitiesPage() {
  const universities = useSelector(selectAllUniversities);

  return (
    <Container>
      <Box sx={{ width: 1 }}>
        <Box
          sx={{
            display: { xs: 'block', md: 'grid' },
          }}
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="1fr"
          gap={2}
        >
          {universities.map((university) => {
            return (
              <UniversityCard key={university.name} university={university} />
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
