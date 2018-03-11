import React from 'react'

class BlogDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  render() {
    const { blog, handleLike } = this.props

    if (!blog) {
      return null
    }
    
    const adder = blog.user ? blog.user.name : 'anonymous'

    return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={handleLike(blog._id)}>like</button>
          </div>
          <div>
            added by {adder}
          </div>
        </div>
      </div>  
    )
  }
}

export default BlogDetails