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

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post(
      'https://jsonplaceholder.typicode.com/posts',
      initialPost,
    );
    return response.data;
  },
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const response = await client.put(
      `https://jsonplaceholder.typicode.com/posts/${initialPost.id}`,
      initialPost,
    );
    return response.data;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
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
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, body } = action.payload;
        const existingPost = state.data.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.body = body;
        }
      });
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.data;

export const selectPostById = (state, postId) =>
  state.posts.data.find((post) => post.id === postId);

export default postsSlice.reducer;
