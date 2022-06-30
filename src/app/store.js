import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import universitiesReducer from '../features/universities/universitiesSlice';
import countriesReducer from '../features/countries/countriesSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    universities: universitiesReducer,
    countries: countriesReducer,
  },
});
