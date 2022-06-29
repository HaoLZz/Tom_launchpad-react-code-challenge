import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllUniversities, fetchUniversities } from './universitiesSlice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UniversityCard from './UniversityCard';
import { Spinner } from '../../components/Spinner';
import UniversitiesPagination from './UniversitiesPagination';

export default function UniversitiesPage() {
  const universities = useSelector(selectAllUniversities);
  const universitiesStatus = useSelector((state) => state.universities.status);
  const error = useSelector((state) => state.universities.error);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const num_of_universities = universities.length;
  // Maximum number of universities per page
  const MAXIMUM_PER_PAGE = 12;

  const totalPagesNum = useMemo(() => {
    if (num_of_universities % MAXIMUM_PER_PAGE === 0) {
      return num_of_universities / MAXIMUM_PER_PAGE;
    } else {
      return Math.floor(num_of_universities / MAXIMUM_PER_PAGE) + 1;
    }
  }, [num_of_universities, MAXIMUM_PER_PAGE]);

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

  // Only show universities that are on the current page
  const universitiesToRender = universities.filter(
    (_, index) =>
      index >= (currentPage - 1) * MAXIMUM_PER_PAGE &&
      index < currentPage * MAXIMUM_PER_PAGE,
  );

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
          {universitiesToRender.map((university) => {
            return (
              <UniversityCard key={university.name} university={university} />
            );
          })}
        </Box>
        <UniversitiesPagination
          totalPages={totalPagesNum}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Container>
  );
}
