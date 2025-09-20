import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  posts: [],
  myPosts: [],
  myPostsStatus: false,
};

const postsSlice = createSlice({
  name: 'posts',
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
    addMyPosts: (state, action) => {
      state.myPostsStatus = true;
      state.myPosts = Array.isArray(action.payload) ? action.payload : [];
    },
    emptyMyPosts: (state) => {
      state.myPostsStatus = false;
      state.myPosts = [];
    },
  },
});

export const { addPosts, emptyPosts, addMyPosts, emptyMyPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
