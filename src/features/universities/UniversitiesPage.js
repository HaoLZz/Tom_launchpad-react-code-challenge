import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllUniversities, fetchUniversities } from './universitiesSlice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UniversityCard from './UniversityCard';
import { Spinner } from '../../components/Spinner';

export default function UniversitiesPage() {
  const universities = useSelector(selectAllUniversities);
  const universitiesStatus = useSelector((state) => state.universities.status);
  const error = useSelector((state) => state.universities.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (universitiesStatus === 'idle') {
      dispatch(fetchUniversities());
    }
  }, [universitiesStatus, dispatch]);

  if (universitiesStatus === 'loading') {
    return <Spinner />;
  } else if (universitiesStatus === 'failed') {
    return <div>{error}</div>;
  }

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
