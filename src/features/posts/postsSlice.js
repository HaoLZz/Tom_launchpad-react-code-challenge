import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get(
    'https://jsonplaceholder.typicode.com/posts?%20_start=0&_limit=20',
  );
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.data.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, body } = action.payload;
      const existingPost = state.data.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.data;

export const selectPostById = (state, postId) =>
  state.posts.data.find((post) => post.id === postId);

export default postsSlice.reducer;
