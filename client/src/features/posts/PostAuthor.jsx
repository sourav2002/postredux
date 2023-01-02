import React from "react";

const PostAuthor = ({ authorName }) => {
  const author = authorName;
  // console.log("name ======> "+author);
  return <span>by <b>{author ? author : "Unknown author"}</b></span>;
};

export default PostAuthor;
