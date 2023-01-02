import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  user: String,
  date: {
    type: Date,
    default: new Date(),
  },
  reactions: {
    thumbsUp: {
      type: Number,
      default: 0,
    },
    hooray: {
      type: Number,
      default: 0,
    },
    heart: {
      type: Number,
      default: 0,
    },
    rocket: {
      type: Number,
      default: 0,
    },
    eyes: {
      type: Number,
      default: 0,
    },
  },
});

const PostData = mongoose.model("PostData", postSchema);
export default PostData;
