import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";

export const EditPostForm = () => {
  const [loading, setLoading] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    user: "",
    id: "",
  });
  const getPost = async () => {
    setLoading(true)
    await axios
      .get(`http://localhost:5000/posts/${postId}`)
      .then((response) => {
        const detail = response.data;
        setLoading(false)
        return setPost({
          content: detail.content,
          title: detail.title,
          id: detail._id,
          user: detail.user,
        });
      });
  };
  useEffect(() => {
    getPost();
  }, []);
  // const navigate = useNavigate();
  // const post = useSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // )

  // const [title, setTitle] = useState(post.title)
  // const [content, setContent] = useState(post.content)
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const onSavePostClicked = async () => {
    setLoading(true)
    const { title, content, id, user } = post;
    // const newTime = new Date().toISOString();
    await axios
      .patch(`https://postredux.up.railway.app/posts/${id}`, {
        title,
        content,
        user,
        id,
      })
      .then((response) => {
        setLoading(false)
        navigate("/");
      });
  };

  return (
    <section className="mx-auto max-w-xl p-4 mt-16">
      <div className="flex justify-center items-center">
        <Spinner loading={loading} />
      </div>
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

//   var newTime = new Date().toISOString();
