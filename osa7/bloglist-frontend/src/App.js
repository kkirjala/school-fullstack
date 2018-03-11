import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      notification: null,
      error: null,
      blogs: [],
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }

  } 

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'Invalid username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }

  }

  handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  handleStateFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // TODO: fix onclick hide problem
  loginForm = () => (
    <div>
      <h2>Login</h2>
      <LoginForm handleLogin={this.handleLogin} 
        handleInputFieldChange={this.handleStateFieldChange}
        username={this.state.username}
        password={this.state.password}
      />
    </div>
  )

  blogList = () => (
    <div>
      <h2>blogs</h2>
      {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog => 
        <Togglable 
          key={blog.id}
          buttonLabel={blog.title}
          ref={component => this.blogEntry = component}
        >
          <Blog key={blog.id} blog={blog} 
            handleLikeButton={this.handleLikeBlog} 
            handleDeleteButton={this.handleDeleteBlog}
          />
        </Togglable>
      )}
    </div>
  )

  handleAddBlog = async (event) => {
    event.preventDefault()

    try {

      const blog = await blogService.create({
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor,
        url: this.state.newBlogUrl,
        user: this.state.user
      })

      this.setState({ 
        newBlogAuthor: '',
        newBlogTitle: '',
        newBlogUrl: '',
        notification: '"' + blog.title + '" added successfully',
        blogs: this.state.blogs.concat(blog)
      })

      this.blogCreationForm.toggleVisibility()

      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)


    } catch(exception) {
      this.setState({
        error: 'Blog creation failed',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }

  }

  handleLikeBlog = async (event, blog) => {
    event.preventDefault()

    try {


      const updateBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user._id,
        likes: blog.likes + 1
      }

      // TODO: fix likes amount race condition
      await blogService.update(blog.id, updateBlog)

      // update view
      const newBlogs = await blogService.getAll()

      this.setState({ 
        blogs: newBlogs,
        notification: '"' + blog.title + '" updated successfully',
      })

      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)


    } catch (exception) {

      this.setState({ 
        error: 'Failed to update "' + blog.title + '"',
      })

      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)

    }





  }

  handleDeleteBlog = async (event, blog) => {
    event.preventDefault()

    try {
      // TODO: delete not working (backend returns a 404)
      await blogService.remove(blog.id)

      // update view
      const newBlogs = this.state.blogs.filter((b) => b.id !== blog.id)

      this.setState({ 
        blogs: newBlogs,
        notification: '"' + blog.title + '" deleted successfully',
      })

      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)


    } catch (exception) {

      console.log(exception)

      this.setState({ 
        error: 'Failed to delete "' + blog.title + '"',
      })

      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)

    }





  }


  // TODO: fix onclick hide problem BlogCreationForm
  render() {

    return (
      <div>
        {this.state.error !== null ? 
          <div>ERROR! {this.state.error}</div> :
          ''
        }

        {this.state.notification !== null ? 
          <div>INFO: {this.state.notification}</div> :
          ''
        }



        {this.state.user === null ?
          this.loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            <form onSubmit={this.handleLogout}>
              <button type="submit">Logout</button>
            </form>

            <Togglable buttonLabel="Create a new blog" ref={component => this.blogCreationForm = component}>
              <BlogCreationForm handleAddBlog={this.handleAddBlog}
                handleInputFieldChange={this.handleStateFieldChange}
                newBlogTitle={this.state.newBlogTitle}
                newBlogAuthor={this.state.newBlogAuthor}
                newBlogUrl={this.state.newBlogUrl}
              />
            </Togglable>

            {this.blogList()}            
          </div>
        }

      </div>
    );
  }
}

export default App;
