import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { postUpdated } from './postsSlice'
import { useNavigate } from 'react-router-dom';

export const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate();
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      var newTime = new Date().toISOString();
      console.log(newTime);
      dispatch(postUpdated({ id: postId, title, content, newTime }))
      console.log("saved successfully");
      navigate("/")
    }
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
          name="postTitle"
          value={title}
          className="shadow container mx-auto appearance-none border rounded max-w-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={onTitleChanged}
        />
        <br />
        <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mt-8 container mx-auto">
          Content:
        </label>
        <br />
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          className="shadow container mx-auto appearance-none border rounded max-w-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={onContentChanged}
        />
        <br />
        <button type="button" className="bg-purple-400 hover:bg-purple-600 hover:text-white rounded-md px-3 py-1 mt-4 mb-8" onClick={onSavePostClicked}>
          Save Post
        </button>
        <br />
      </form>
    </section>
  );
};
export default EditPostForm;
