import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { postUpdated } from './postsSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post,setPost]=useState({
    title : "",
    content : "",
    user : "",
    id : ""
  })
  const getPost = async()=>{
    const res = await axios.get('http://localhost:5000/posts',{
      params: {
        id: postId
      }
    })
    .then((e)=>{
      const detail = e.data
    detail.map((e)=>{
     setPost({
      content : e.content,
      title : e.title,
      id : e._id,
      user : e.user
     })
    })
    })
  }
  useEffect(()=>{getPost()},[])
  // const navigate = useNavigate();
  // const post = useSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // )

  // const [title, setTitle] = useState(post.title)
  // const [content, setContent] = useState(post.content)
  // const dispatch = useDispatch();

 const handleChange = (e)=>{
  let name = e.target.name
  let value = e.target.value
  setPost({
    ...post , [name]:value
  })
 }

  const onSavePostClicked = async() => {
    const {title,content,id,user}=post
    const newTime = new Date().toISOString();
 const snd = await axios.patch('http://localhost:5000/posts',{
title,content,user,id
 })
 .then((e)=>{
 const {_id} = e.data
  if(_id){
    window.alert("Post Updated")
    navigate('/')
  }
 })
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
        <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mt-8 container mx-auto">
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
        <button type="button" className="bg-purple-400 hover:bg-purple-600 hover:text-white rounded-md px-3 py-1 mt-4 mb-8" onClick={onSavePostClicked}>
          Save Post
        </button>
        <br />
      </form>
    </section>
  );
};
export default EditPostForm;


//   var newTime = new Date().toISOString();