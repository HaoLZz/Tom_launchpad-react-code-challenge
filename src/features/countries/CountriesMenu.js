import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCountries, fetchCountries } from './countriesSlice';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Spinner } from '../../components/Spinner';

// const options = [
//   'Countries',
//   'Germany',
//   'Argentina',
//   'Australia',
//   'Ireland',
//   'Canada',
//   'Hong Kong',
// ];

export default function CountriesMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const countries = useSelector(selectAllCountries);
  const countryNames = countries.map((country) => country.name);
  const options = ['Countries', ...countryNames];
  const countriesStatus = useSelector((state) => state.countries.status);
  const error = useSelector((state) => state.countries.error);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (countriesStatus === 'idle') {
      dispatch(fetchCountries());
    }
  }, [dispatch, countriesStatus]);

  if (countriesStatus === 'loading') {
    return <Spinner />;
  } else if (countriesStatus === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      <List
        component="nav"
        aria-label="Countries selection dropdown menu"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="menu-button"
          aria-haspopup="listbox"
          aria-controls="dropdown-menu"
          aria-label="please select a country"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="The country you selected is:"
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'countries-dropdown',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
