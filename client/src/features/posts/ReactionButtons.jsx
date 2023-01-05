import axios from "axios";
import React from "react";
import { useState } from "react";
// // import { useDispatch } from "react-redux";

// import {reactionAdded} from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButton = ({ post, setPost }) => {
  //   // const dispatch = useDispatch();
  // const [post, setPost] = useState();
  const [reactions, setReactions] = useState();
  // const getLikes = async () => {
  //   await axios
  //     .get(`http://localhost:5000/posts/${post._id}`, {
  //     })
  //     .then((response) => {
  //       console.log("eee");
  //       setPost(response.data);
  //       setReactions(response.data.reactions);
  //     });
  // };


  const reactionHandler = async (name, id) => {
    const { reactions } = post;
    const value = reactions[name]++;
    setReactions({ ...reactions, [name]: value });
    // setPost(post.reactions === reactions)
    // const v = reactions[name];
    // setReactions({ ...reactions, [name]: v });

    await axios
      .patch(`https://postredux.up.railway.app/posts/${id}/likes`, {
        data: {
          reactions,
        },
      }).then((response)=>{
        setReactions(reactions)
      })
      .catch((err)=>{
        console.log("get this error while try to like post in backend ==> "+ err);
      })
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const id = post._id;
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button shadow-sm px-2 py-1 mb-8 text-xl border border-dotted mr-4"
        onClick={() => reactionHandler(name, id)}
      >
        {emoji} {reactions ? reactions[name] : post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButton;
