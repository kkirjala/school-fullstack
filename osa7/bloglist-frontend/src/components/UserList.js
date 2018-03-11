import React from 'react'
import { Link } from 'react-router-dom'

const UserList = (props) => {
  
    if (!props.users) {
        return null
    }

    const users = props.users
    return (
        <div>
            <h2>users</h2>
            {users.map(user => 
                <div key={user._id}>
                    <Link to={`/users/${user._id}`}>{user.name}</Link>
                    ({user.blogs.length} blogs)
                </div>                
            )}

        </div>
      )
  }
  
export default UserList