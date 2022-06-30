import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

export const fetchInfoByPostal = createAsyncThunk(
  'posts/fetchInfoByPostal',
  async (postal) => {
    const response = await client.get(`https://api.zippopotam.us/us/${postal}`);
    return response.data;
  },
);

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

const postalSlice = createSlice({
  name: 'postal',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchInfoByPostal.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchInfoByPostal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchInfoByPostal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postalSlice.reducer;
