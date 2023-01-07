import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../redux/api/postsThunkAPI";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButton = ({postId}) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>state.posts.posts.find((post) => post._id === postId));
  
  const reactionHandler = useCallback(
    (name) => {
      const { reactions } = post;
      const reaction = { ...reactions };
      reaction[name]++;
      const reactionAndId = { reactions: reaction, _id: postId };
      dispatch(likePost(reactionAndId));
    },
    [dispatch, post, postId]
  );

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button shadow-sm px-2 py-1 mb-8 text-xl border border-dotted mr-4"
        onClick={() => reactionHandler(name)}
      >
        {emoji} {post.reactions ? post.reactions[name] : post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButton;
