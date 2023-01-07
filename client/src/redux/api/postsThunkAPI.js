import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const response = axios.get(`https://postredux.up.railway.app/posts/`);
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://postredux.up.railway.app/posts/${postId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://postredux.up.railway.app/posts",
        postData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData, thunkAPI) => {
    try {
      const postId = postData._id;
      const response = await axios.patch(
        `https://postredux.up.railway.app/posts/${postId}`,
        postData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (reactionAndId, thunkAPI) => {
    try {
      const postId = reactionAndId._id;
      const response = await axios.patch(
        `https://postredux.up.railway.app/posts/${postId}/likes`,
        reactionAndId
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      await axios.delete(
        `https://postredux.up.railway.app/posts/${postId}`
      );
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
