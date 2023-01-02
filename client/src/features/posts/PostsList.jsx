import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import ReactionButton from './ReactionButtons'
import TimeAgo from './TimeAgo'

const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  const posts1 = useSelector((state) => state.posts1);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt p-4 border rounded-md mt-2 " key={post._id|| post.id}>
      <h3 className="text-2xl">{post.title}</h3>
      <div>
          <PostAuthor authorName={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
      <p className="post-content py-4 items-center text-gray-500">{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
      <Link to={`/posts/${post.id}`} className="button button-disabled text-blue-500 font-semibold">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className="posts-list p-4 mt-2 mb-10 mx-auto max-w-xl">
      <h2 className="text-3xl font-bold tracking-wide">Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList;
