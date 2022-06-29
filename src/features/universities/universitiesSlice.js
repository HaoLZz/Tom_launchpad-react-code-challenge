import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

export const fetchUniversities = createAsyncThunk(
  'universities/fetchUniversities',
  async (country) => {
    const response = await client.get(
      `http://universities.hipolabs.com/search?country=${country}`,
    );
    return response.data;
  },
);

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const universitiesSlice = createSlice({
  name: 'universities',
  initialState,
  reducers: {
    resetUniversitiesStatus(state, action) {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUniversities.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetUniversitiesStatus } = universitiesSlice.actions;

export const selectAllUniversities = (state) => state.universities.data;

export default universitiesSlice.reducer;
