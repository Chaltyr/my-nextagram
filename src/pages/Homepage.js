import React from 'react'
import UserImg from '../components/UserImages'

import { Link } from 'react-router-dom'
import UserProfileImages from '../components/UserProfileImages'

const imgStyle = {
    height: '50px',
    width: '50px'
}

const divStyle = {
    display: "flex",
    flexDirection: "column"
}

const listStyle = {
    display: "flex"
}

const HomePage = (props) => {
    return (
        <ul>
        {props.usersFromApp.map(user => (
          <li style={listStyle }>
            <div style={divStyle}>
                <Link to={`/users/${user.id}`}>
                    {user.username}
                </Link>
                <img style={imgStyle} src={user.profileImage}></img>
            </div>
            <UserProfileImages id={user.id}/>
          </li>
        ))}
      </ul>
    )
}

export default HomePage