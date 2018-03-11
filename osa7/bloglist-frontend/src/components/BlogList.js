import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, handleLike}) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogsInOrder = blogs.sort(byLikes)

  return (
    <div>
        <h2>blogs</h2>
        {blogsInOrder.map(blog => 
            <Blog key={blog._id} 
                blog={blog} 
                like={handleLike(blog._id)}
            />
        )}
    </div>
  )
}

export default BlogList