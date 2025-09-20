import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import postsReducer from './postsSlice.js';
import myPostsReducer from './myPostsSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    myPosts: myPostsReducer,
  },
});

export default store;
