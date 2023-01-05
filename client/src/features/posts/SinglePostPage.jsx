import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
// import { postDeleted } from "./postsSlice";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";

const SinglePostPage = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  // const post = useSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // );

  let navigate = useNavigate();
  const getPost = async () => {
    setLoading(true);
    await axios
      .get(`https://postredux.up.railway.app/posts/${postId}`)
      .then((response) => {
        const post = response.data;
        setPost(post);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log("got this error ===>  " + e);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const onDeleteClick = async () => {
    setLoading(true);
    const wanttodelete = window.confirm("Are you sure you want to delete? ");
    if (wanttodelete) {
      await axios
        .delete(`https://postredux.up.railway.app/posts/${postId}`)
        .then((e) => {
          setLoading(false);
          navigate("/");
        })
        .catch((e) => {
          setLoading(false);
          console.log("got this error ===>  " + e);
        });
    }
  };

  if (!post.title) {
    return (
      <section className="text-center text-2xl">
        <div className="flex justify-center items-center">
          <Spinner loading={loading} />
        </div>
        {/* <h2>Post not found!</h2> */}
      </section>
    );
  }

  return (
    <div className="mt-10 mb-10 p-4 mx-auto max-w-xl">
      <div className="flex justify-center items-center">
        <Spinner loading={loading} />
      </div>
      <article className="post-excerpt p-4 " key={post._id}>
        <h3 className="text-4xl">{post.title}</h3>
        <div className="mt-2">
          <PostAuthor authorName={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content py-4 items-center text-gray-800">
          {post.content}
        </p>
        {post._id ? <ReactionButtons post={post} setPost={setPost} /> : ""}
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
