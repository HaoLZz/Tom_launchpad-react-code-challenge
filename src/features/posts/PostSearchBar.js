import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostById } from './postsSlice';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

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
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function PostSearchBar({ searchInput = '', setSearchInput }) {
  const dispatch = useDispatch();

  const onSearchInput = (e) => {
    setSearchInput(e.target.value);
    const postId = Number(e.target.value);
    if (!Number.isNaN(postId) && !(postId === 0)) {
      dispatch(fetchPostById(postId));
    }
  };

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon color="primary" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search By ID"
          inputProps={{ 'aria-label': 'search' }}
          value={searchInput}
          onInput={onSearchInput}
        />
      </Search>
    </Box>
  );
}
