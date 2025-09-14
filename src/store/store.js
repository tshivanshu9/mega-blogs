import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import postsReducer from './postsSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export default store;
