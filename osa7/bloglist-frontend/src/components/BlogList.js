import React from 'react'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({blogs, handleLike}) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogsInOrder = blogs.sort(byLikes)

  return (
    <div>
        <h2>blogs</h2>
        {blogsInOrder.map(blog => 
            <Link to={`/blogs/${blog._id}`}>
                <Blog key={blog._id} 
                    blog={blog} 
                    like={handleLike(blog._id)}
                />
            </Link>

        )}
    </div>
  )
}

export default BlogList