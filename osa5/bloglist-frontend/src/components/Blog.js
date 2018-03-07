import React from 'react'
const Blog = ({blog}) => (
  <div key={blog.key}>
    {blog.title} {blog.author}
  </div>  
)

export default Blog