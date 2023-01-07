import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getPosts } from "../../redux/api/postsThunkAPI";
import PostAuthor from "./PostAuthor";
import ReactionButton from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts =  useSelector((state) => state.posts.posts);
  const [loading, setLoading] = useState(true);
  const error = useSelector((state) => state.posts.error);
  
  useEffect(() => {
    dispatch(getPosts()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner text="fetching posts....." loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center">{error.message}</div>;
  }
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="posts-list p-4 mt-2 mb-10 mx-auto max-w-xl">
      <h2 className="text-3xl font-bold tracking-wide">Posts</h2>
      {/* render posts */}

      {orderedPosts.map((post) => (
        <article
          className="post-excerpt p-4 border rounded-md mt-2 "
          key={post._id + Math.random() + Math.random() || post._id}
        >
          <h3 className="text-2xl">{post.title}</h3>
          <div>
            <PostAuthor authorName={post.user} />
            <TimeAgo timestamp={post.date} />
          </div>
          <p className="post-content py-4 items-center text-gray-500">
            {post.content.substring(0, 100)}
          </p>
          <ReactionButton postId={post._id}/>
          <button
            className="button button-disabled text-blue-500 font-semibold"
            onClick={() => {
              navigate(`/posts/${post._id}`);
            }}
          >
            View Post
          </button>
        </article>
      ))}
      {/* end render posts */}
    </section>
  );
};

export default PostsList;
