import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import postalReducer from '../features/postal/postalSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    postal: postalReducer,
  },
});
