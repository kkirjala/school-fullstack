import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  handleLogin = () => {
    // TODO
  }

  handleUsernameChange = (username) => {
    this.setState({
      username: username
    })
  }

  handlePasswordChange = (password) => {
    this.setState({
      password: password
    })
  }

  render() {
    return (
      <div>


        <div>
          <h2>Login</h2>
          <LoginForm handleLogin={this.handleLogin()} 
            handleUsernameChange={this.handleUsernameChange()}
            handlePasswordChange={this.handlePasswordChange()}
            username={this.state.username}
            password={this.state.password}
          />
        </div>

        <div>
          <h2>blogs</h2>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
        </div>


      </div>
    );
  }
}

export default App;
