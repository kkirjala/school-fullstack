import React from 'react'

class Blog extends React.Component {

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const authorString = this.props.blog.user ? 
      this.props.blog.user.name : 'unknown'

    return (
      <div style={blogStyle} key={this.props.blog.key}>
        <div>{this.props.blog.title} {this.props.blog.author}</div>
        <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
        <div>{this.props.blog.likes} likes <button>like</button></div>
        <div>Added by {authorString}</div>
      </div>  
    )  
  }
}


export default Blog