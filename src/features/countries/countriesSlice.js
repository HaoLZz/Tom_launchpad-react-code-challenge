import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await client.get(
      'https://countriesnow.space/api/v0.1/countries/info?returns=none',
    );
    return response.data;
  },
);

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //  Extract country names from API response and sort them in alphabetical order
        state.data = action.payload.data.map((country) => country.name).sort();
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Failed to fetch countries';
      });
  },
});

export const selectAllCountries = (state) => state.countries.data;

export default countriesSlice.reducer;
