import { createSlice } from "@reduxjs/toolkit";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "./api/postsThunkAPI";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      const updatedPost = action.payload;
      const index = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (index >= 0) {
        state.posts[index] = updatedPost;
      }
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      const retrievedPost = action.payload;
      const index = state.posts.findIndex(
        (post) => post._id === retrievedPost._id
      );
      if (index >= 0) {
        state.posts[index] = retrievedPost;
      } else {
        state.posts.push(retrievedPost);
      }
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      const deletedPostId = action.payload;
      state.posts = state.posts.filter((post) => post._id !== deletedPostId);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [likePost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = false;
      const reactionAndId = action.payload;
      const index = state.posts.findIndex((post) => post._id === reactionAndId._id);
      if (index >= 0 && index < state.posts.length) {
        state.posts[index].reactions = reactionAndId.reactions;
      }
    },
    [likePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
