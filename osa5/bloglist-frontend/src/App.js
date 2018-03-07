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
      {this.state.blogs.map(blog => 
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )

  handleAddBlog = async (event) => {
    event.preventDefault()

    try {

      console.log(this.state.newBlogAuthor)

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

  blogCreationForm = () => {

    return (
      <div>
        <Togglable buttonLabel="Create a new blog">
          <BlogCreationForm handleAddBlog={this.handleAddBlog}
            handleInputFieldChange={this.handleStateFieldChange}
            newBlogTitle={this.state.newBlogTitle}
            newBlogAuthor={this.state.newBlogAuthor}
            newBlogUrl={this.state.newBlogUrl}
          />
        </Togglable>
      </div>
    )
}





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
            {this.blogCreationForm()}
            {this.blogList()}            
          </div>
        }

      </div>
    );
  }
}

export default App;
