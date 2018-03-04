import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: null,
      error: null,
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
        handleUsernameChange={this.handleStateFieldChange}
        handlePasswordChange={this.handleStateFieldChange}
        username={this.state.username}
        password={this.state.password}
      />
    </div>
  )

  blogList = () => (
    <div>
      <h2>blogs</h2>
      {this.state.blogs.map(blog => 
        <Blog key={blog._id} blog={blog}/>
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
        notification: 'Blog added successfully'
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

  blogCreationForm = () => (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={this.handleAddBlog}>
          <input
              value={this.state.newBlogTitle}
              name="newBlogTitle"
              onChange={this.handleStateFieldChange}
          />
          <input
              value={this.state.newBlogAuthor}
              name="newBlogAuthor"
              onChange={this.handleStateFieldChange}
          />
          <input
              value={this.state.newBlogUrl}
              name="newBlogUrl"
              onChange={this.handleStateFieldChange}
          />
          <button type="submit">Save</button>
      </form>
    </div>  
  )



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
