import React from "react";
import { useDispatch } from "react-redux";

import {reactionAdded} from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();

  function reactionHandler(name) {
    // console.log(post.id);
    // console.log(name);
    try{
      dispatch(reactionAdded({ postId: post.id, reaction: name }));
    }catch(e){
      console.log(e);
    }
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button shadow-sm px-2 py-1 mb-8 text-xl border border-dotted mr-4"
        onClick={() =>reactionHandler(name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButton;
