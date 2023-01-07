import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { deletePost } from "../../redux/api/postsThunkAPI";

const SinglePostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const post = useSelector((state) =>
    state.posts.posts.find((post) => post._id === postId)
  );

  const onDeleteClick = async () => {
    const sure = window.confirm("Are you sure to delete ?");
    if (sure) {
      dispatch(deletePost(postId));
      navigate("/");
    }
  };

  return (
    <div className="mt-10 mb-10 p-4 mx-auto max-w-xl">
      <article className="post-excerpt p-4 " key={post._id}>
        <h3 className="text-4xl">{post.title}</h3>
        <div className="mt-2">
          <PostAuthor authorName={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content py-4 items-center text-gray-800">
          {post.content}
        </p>
        <ReactionButtons postId={post._id}/>
        <Link to={`/editPost/${post._id}`}>
          <button className="bg-blue-600 px-3 py-2  rounded-sm  text-white font-bold">
            Edit Post
          </button>
        </Link>
        <button
          className="bg-red-500 px-3 py-2 mx-8 rounded-sm  text-white font-bold"
          onClick={() => onDeleteClick()}
        >
          Delete Post
        </button>
      </article>
    </div>
  );
};
export default SinglePostPage;
