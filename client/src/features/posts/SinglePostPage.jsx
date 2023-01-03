import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
// import { postDeleted } from "./postsSlice";
import axios from "axios";
import { useEffect } from "react";

const SinglePostPage = () => {
    const { postId } = useParams();
const [post,setPost]=useState({})
  // const post = useSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // );

  let navigate = useNavigate();
  const getPost = async()=>{
    const res = await axios.get('http://localhost:5000/post',{
      params: {
        id: postId
      }
    })
    .then((e)=>{
      const detail = e.data
    setPost(detail)
    })
  }
  useEffect(()=>{getPost()},[])
  const onDeleteClick = async() => {
    const {_id} = post
 const id = _id
    
 const res = await axios.delete('http://localhost:5000/posts',{
  params: {
    id: postId
  }
}
 ).then((e)=>{
const data = e.data
if(data){
    window.alert(data.message)
    navigate('/')
}
 })
  };

  if (!post) {
    return (
      <section className="text-center text-2xl">
        <h2>Post not found!</h2>
      </section>
    );
  }

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
      {post._id ? <ReactionButtons post={post} /> : ""}
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
