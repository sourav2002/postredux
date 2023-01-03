import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import ReactionButton from './ReactionButtons'
import TimeAgo from './TimeAgo'

const PostsList = () => {
  const navigate = useNavigate()
  const [posts,setPosts]=useState([])

  const getPosts = async()=>{
    const pp = await axios.get('http://localhost:5000/posts' )
   .then((e)=>{
setPosts(e.data)
  })
   

  }
  useEffect(()=>{getPosts()},[])
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  return (
    <section className="posts-list p-4 mt-2 mb-10 mx-auto max-w-xl">
      <h2 className="text-3xl font-bold tracking-wide">Posts</h2>
     {/* render posts */}
     
  { orderedPosts.map((post) => (
    <article className="post-excerpt p-4 border rounded-md mt-2 " key={post._id|| post.id}>
      <h3 className="text-2xl">{post.title}</h3>
      <div>
          <PostAuthor authorName={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
      <p className="post-content py-4 items-center text-gray-500" >{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
      <button  className="button button-disabled text-blue-500 font-semibold" onClick={()=>{navigate(`/posts/${post._id}`)}}>
        View Post
      </button>
    </article>
  ))}
     {/* end render posts */}
    </section>
  )
}

export default PostsList;
