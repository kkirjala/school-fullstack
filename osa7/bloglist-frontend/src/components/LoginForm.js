import React from 'react'


const LoginForm = (props) => (
  <div>
    <h2>Kirjaudu sovellukseen</h2>
    <form onSubmit={props.handleLogin}>
        <div>
            käyttäjätunnus
            <input
                type="text"
                name="username"
                value={props.username}
                onChange={props.handleLoginChange}
            />
        </div>
        <div>
            salasana
            <input
                type="password"
                name="password"
                value={props.password}
                onChange={props.handleLoginChange}
            />
        </div>
        <button type="submit">kirjaudu</button>
    </form>
  </div>  
)

export default LoginForm