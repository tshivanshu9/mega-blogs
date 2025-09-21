import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  posts: [],
};

const postsSlice = createSlice({
  name: 'myPosts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.status = true;
      state.posts = Array.isArray(action.payload) ? action.payload : [];
    },
    emptyPosts: (state) => {
      state.status = false;
      state.posts = [];
    },
  },
});

export const { addPosts, emptyPosts } = postsSlice.actions;

export default postsSlice.reducer;
