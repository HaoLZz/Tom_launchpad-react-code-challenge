import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    userId: 1,
    id: 1,
    title: 'First Post',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae deleniti architecto sit expedita, quia perspiciatis, delectus, excepturi tenetur dolorem accusamus at temporibus qui nesciunt quasi!',
  },
  {
    userId: 1,
    id: 2,
    title: 'Second Post',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae deleniti architecto sit expedita, quia perspiciatis, delectus, excepturi tenetur dolorem accusamus at temporibus qui nesciunt quasi!amet consectetur adipisicing elitamet consectetur adipisicing elit',
  },
  {
    userId: 2,
    id: 3,
    title: 'Another Post',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae deleniti architecto sit expedita, quia perspiciatis, delectus, excepturi tenetur dolorem accusamus at temporibus qui nesciunt quasi!',
  },
  {
    userId: 2,
    id: 4,
    title: 'New Post from someone',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae deleniti architecto sit expedita, quia perspiciatis, delectus, excepturi tenetur dolorem accusamus at temporibus qui nesciunt quasi!',
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
    postUpdated(state, action) {
      const { id, title, body } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
