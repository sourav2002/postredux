import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/api/postsThunkAPI";

export const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const postData = useSelector((state) =>
    state.posts.posts.find((post) => post._id === postId)
  );
  const [post, setPost] = useState({
    title: postData.title,
    content: postData.content,
    user: postData.user,
    _id: postId,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPost({ ...post, [name]: value });
  };

  const onSavePostClicked = () => {
    dispatch(updatePost(post));
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner text="updating posts....." loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">{error.message}</div>
    );
  }
  return (
    <section className="mx-auto max-w-xl p-4 mt-16">
      <h2 className="text-3xl mb-4 font-bold container">Edit Post</h2>
      <form className="bg-white ">
        <label
          htmlFor="postTitle"
          className="block text-gray-700 text-sm font-bold mb-2 mt-8 container mx-auto"
        >
          Post Title:
        </label>
        <input
          type="text"
          id="postTitle"
          name="title"
          value={post.title}
          className="shadow container mx-auto appearance-none border rounded max-w-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
        <br />
        <label
          htmlFor="postContent"
          className="block text-gray-700 text-sm font-bold mt-8 container mx-auto"
        >
          Content:
        </label>
        <br />
        <textarea
          id="postContent"
          name="content"
          value={post.content}
          className="shadow container mx-auto appearance-none border rounded max-w-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
        <br />
        <button
          type="button"
          className="bg-purple-400 hover:bg-purple-600 hover:text-white rounded-md px-3 py-1 mt-4 mb-8"
          onClick={onSavePostClicked}
        >
          Save Post
        </button>
        <br />
      </form>
    </section>
  );
};
export default EditPostForm;
