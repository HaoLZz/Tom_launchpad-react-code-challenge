import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import universitiesReducer from '../features/universities/universitiesSlice';
import countriesReducer from '../features/countries/countriesSlice';
import postalReducer from '../features/postal/postalSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    universities: universitiesReducer,
    countries: countriesReducer,
    postal: postalReducer,
  },
});
