import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getPosts = createAsyncThunk("posts/getPosts", async () => {
  return fetch("https://postredux.up.railway.app/posts").then((res) => res.json());
});
const initialState = [
  
];

const postsSlice = createSlice({
  name: "posts1",
  initialState,
  reducers : {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      console.log("pending");
    },
    [getPosts.fulfilled]: (state, action) => {
      state = action.payload;
      console.log("fulfilled");
    },
    [getPosts.rejected]: (state, action) => {
      console.log("failed");
    },
  },
});

export default postsSlice.reducer;
