import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
const initialState = {
  data: [],
  status: 'idle',
  error: null,
  searchStatus: 'idle',
  searchResult: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get(
    'https://jsonplaceholder.typicode.com/posts?%20_start=0&_limit=20',
  );
  return response.data;
});

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId) => {
    const response = await client.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    return response.data;
  },
);

export const deletePostById = createAsyncThunk(
  'posts/deletePostById',
  async (postId) => {
    const response = await client.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    return { ...response.data, id: postId };
  },
);

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
  reducers: {
    resetSearchResult(state, action) {
      state.searchResult = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
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
      })
      .addCase(fetchPostById.pending, (state, action) => {
        state.searchStatus = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        const { id, title, body } = action.payload;
        state.searchResult = action.payload;
        const existingPost = state.data.find((post) => post.id === id);
        if (!existingPost) {
          state.data.push(action.payload);
        } else {
          existingPost.title = title;
          existingPost.body = body;
        }
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingPostIndex = state.data.findIndex(
          (post) => post.id === id,
        );
        if (existingPostIndex !== -1) {
          state.data.splice(existingPostIndex, 1);
        }
      });
  },
});

export const { resetSearchResult } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.data;

export const selectPostById = (state, postId) =>
  state.posts.data.find((post) => post.id === postId);

export default postsSlice.reducer;
