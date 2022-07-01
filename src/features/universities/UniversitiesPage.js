import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllUniversities, fetchUniversities } from './universitiesSlice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UniversityCard from './UniversityCard';
import Typography from '@mui/material/Typography';
import { Spinner } from '../../components/Spinner';
import UniversitiesPagination from './UniversitiesPagination';
import CountriesMenu from '../countries/CountriesMenu';

export default function UniversitiesPage() {
  const universities = useSelector(selectAllUniversities);
  const universitiesStatus = useSelector((state) => state.universities.status);
  const lastSearchedCountry = useSelector(
    (state) => state.universities.lastSearchedCountry,
  );
  const error = useSelector((state) => state.universities.error);
  const dispatch = useDispatch();

  // If there is no previous search for universities, set default country to Canada otherwise set to lastSearchedCountry
  const initialCountry =
    lastSearchedCountry === '' ? 'Canada' : lastSearchedCountry;
  const [countrySelected, setCountrySelected] = useState(initialCountry);

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
      dispatch(fetchUniversities(countrySelected));
      setCurrentPage(1);
    }
  }, [universitiesStatus, dispatch, countrySelected]);

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
      <Typography
        variant="h4"
        component="h2"
        marginTop={5}
        gutterBottom
        textTransform="capitalize"
        sx={{
          fontSize: { xs: '1.25rem', md: '2.5rem' },
          fontWeight: '500',
          backgroundImage: 'conic-gradient(#553c9a, #ee4b2b, #00c2cb);',
          color: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Give Your Rating for Universities around the world
      </Typography>
      <CountriesMenu
        countrySelected={countrySelected}
        setCountrySelected={setCountrySelected}
      />
      <Box sx={{ width: 1 }}>
        {num_of_universities === 0 ? (
          <Box textAlign="center">
            We could not find any universities in {countrySelected}
          </Box>
        ) : (
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
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <UniversitiesPagination
            totalPages={totalPagesNum}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      </Box>
    </Container>
  );
}
