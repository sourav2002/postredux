import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const AddPostForm = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState({
    title: "",
    user: "",
    content: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDetail({ ...detail, [name]: value });
  };

  const onSavePostClicked = async () => {
    setLoading(true)
    const data = {
      title: detail.title,
      content: detail.content,
      user: detail.user,
    };
    await axios
      .post("https://postredux.up.railway.app/posts", data)
      .then((e) => {
        setLoading(false)
        if (e.statusText) {
          navigate("/");
        }
      });
  };

  // const canSave = Boolean(title) && Boolean(content);

  return (
    <section className="mx-auto p-4 max-w-xl mt-16">
      <div className="flex justify-center items-center">
        <Spinner text="Adding post" loading={loading} />
      </div>
      <h2 className="text-2xl font-bold container">Add a New Post</h2>
      <form className="bg-white rounded ">
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
          value={detail.title}
          className="shadow container mx-auto appearance-none border rounded max-w-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
        <label
          htmlFor="postAuthor"
          className="block text-gray-700 text-sm font-bold mb-2 mt-8 container mx-auto"
        >
          Author:
        </label>
        <input
          type="text"
          id="postAuthor"
          name="user"
          value={detail.user}
          className="shadow container mx-auto appearance-none border rounded max-w-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
        <label
          htmlFor="postContent"
          className="block text-gray-700 text-sm font-bold mt-8 container mx-auto"
        >
          Content:
        </label>

        <textarea
          id="postContent"
          name="content"
          value={detail.content}
          className="shadow container mx-auto appearance-none border rounded max-w-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />

        <button
          type="button"
          className="bg-purple-300 hover:bg-purple-500 hover:text-white rounded-md px-3 py-1 mt-4 mb-8"
          onClick={onSavePostClicked}
          // disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
