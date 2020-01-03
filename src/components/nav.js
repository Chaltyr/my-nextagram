import React from 'react'
import { Link } from "react-router-dom"
import MyModal from "./Modal"

const navStyle = {
    display: "flex",
    justifyContent: "flex-end", 
    marginBottom: "0"
}

const divStyle = {
    display: "flex",
    justifyContent: "space-between"
  }

  const marginStyle = {
    marginLeft: "20px",
    marginTop: "10px"
  }

  const marginStyleOther = {
    marginRight: "20px",
    marginTop: "10px"
  }

const Nav = (props) => {
    return (
        <div id="mainDiv" style={divStyle}>
        <div style={marginStyle}>
          <Link to="/">
              <button>
                Home
              </button>
          </Link>
          <Link to={`/users/${props.user.id}`}>
            <button>
              My Profile
            </button>
          </Link>
          <Link to={"/upload"}  >
              <button>
                  Upload
              </button>
          </Link>
        </div>
          
        <div style={marginStyleOther}>
          {/* <button>Log in</button>
          <button>Sign up</button>
          <button>Log out</button> */}
          <MyModal user={props.user} setUserinLogin={props.setUserinLogin}/>
        </div>
      </div>
    )
}


export default Nav