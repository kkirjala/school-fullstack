import React from 'react'


const LoginForm = (props) => (
  <div>
    <form onSubmit={props.handleLogin}>
        <div>
            käyttäjätunnus
            <input
                type="text"
                name="username"
                value={props.username}
                onChange={props.handleInputFieldChange}
            />
        </div>
        <div>
            salasana
            <input
                type="password"
                name="password"
                value={props.password}
                onChange={props.handleInputFieldChange}
            />
        </div>
        <button type="submit">kirjaudu</button>
    </form>
  </div>  
)

export default LoginForm