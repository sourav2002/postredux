import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import * as api from '../../api/index.js'

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    user: "Sourav",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    user: "Saini",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, user) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: user,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },

    reactionAdded(state, action) {
      // console.log("working");
      const { postId, reaction } = action.payload;

      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, title, content, newTime } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.date = newTime;
      }
    },
    postDeleted(state, action) {
      const { idToRemove } = action.payload;
      var len = state.length;
      while (len--) {
        if (state[len].id === idToRemove) {
          state.splice(len, 1);
        }
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded, postDeleted } =
  postsSlice.actions;

export default postsSlice.reducer;
