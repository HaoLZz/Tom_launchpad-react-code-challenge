import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [
  {
    domains: ['cstj.qc.ca'],
    web_pages: [
      'https://www.cstj.qc.ca',
      'https://ccmt.cstj.qc.ca',
      'https://ccml.cstj.qc.ca',
    ],
    'state-province': null,
    name: 'C\u00e9gep de Saint-J\u00e9r\u00f4me',
    country: 'Canada',
    alpha_two_code: 'CA',
  },
  {
    domains: ['lambtoncollege.ca', 'mylambton.ca'],
    web_pages: ['https://www.lambtoncollege.ca'],
    'state-province': 'Sarnia',
    name: 'Lambton College',
    country: 'Canada',
    alpha_two_code: 'CA',
  },
  {
    domains: ['acadiau.ca'],
    web_pages: ['http://www.acadiau.ca/'],
    'state-province': null,
    name: 'Acadia University',
    country: 'Canada',
    alpha_two_code: 'CA',
  },
  {
    domains: ['algonquincollege.com'],
    web_pages: ['http://www.algonquincollege.com/'],
    'state-province': null,
    name: 'Algonquin College',
    country: 'Canada',
    alpha_two_code: 'CA',
  },
  {
    domains: ['ashtoncollege.com'],
    web_pages: ['http://www.ashtoncollege.com/'],
    'state-province': null,
    name: 'Ashton College',
    country: 'Canada',
    alpha_two_code: 'CA',
  },
  {
    domains: ['assumptionu.ca'],
    web_pages: ['http://www.assumptionu.ca/'],
    'state-province': null,
    name: 'Assumption University',
    country: 'Canada',
    alpha_two_code: 'CA',
  },
];

const universitiesSlice = createSlice({
  name: 'universities',
  initialState,
  reducers: {},
});

export const selectAllUniversities = (state) => state.universities;

export default universitiesSlice.reducer;
