import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function PostalSearchBar({
  searchInput = '',
  setSearchInput,
  onSubmit,
}) {
  const onSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Box
      sx={{
        display: {
          xs: 'block',
          md: 'flex',
          justifyContent: 'center',
          marginBottom: '35px',
        },
      }}
    >
      <Box sx={{ flex: '40% 0 1' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="primary" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Please enter postal code to search"
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
            value={searchInput}
            onInput={onSearchInput}
          />
        </Search>
      </Box>
      <Box
        sx={{
          flex: '15% 0 1',
          textAlign: { xs: 'center' },
          margin: { xs: '15px auto', md: '0' },
        }}
      >
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
