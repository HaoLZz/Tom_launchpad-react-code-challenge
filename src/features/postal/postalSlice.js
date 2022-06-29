import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
const initialState = {
  data: {
    'post code': '90210',
    country: 'United States',
    'country abbreviation': 'US',
    places: [
      {
        'place name': 'Beverly Hills',
        longitude: '-118.4065',
        state: 'California',
        'state abbreviation': 'CA',
        latitude: '34.0901',
      },
    ],
  },
  status: 'idle',
  error: null,
};

const postalSlice = createSlice({ name: 'postal', initialState, reducers: {} });

export default postalSlice.reducer;
