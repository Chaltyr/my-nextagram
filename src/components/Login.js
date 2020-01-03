import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'


const formStyle = {
    display: "flex",
    flexDirection: 'column'
}


// const { id, username } = user
// const user = {
//     id: 1,
//     username: 'Blake'
// }
// const { id, username } = user
// user.id
// user.username

// const LoginForm = ({ toggle, user })


const LoginForm = ({toggle, user, setUserinLogin}) => {
    const history = useHistory()

    const [userInfo, setUserinfo] = useState({
        username:"",
        password:"",
    })
    const [validUser, setValidUser] = useState(null)
    const [timer, setTimer] = useState(null)
    
    const [item, setItem ] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    

    // const displayHelperMessage = () => {
    //     if (validUser) {
    //       if (validUser === 'valid') {
    //         return <p className="text-success">Username is correct!!</p>
    //       } else {
    //         return <p className="text-danger">Wrong username, try again!!</p>
    //       }
    //     } else {
    //       return null
    //     }
    //   }

    // const displayLoggedIn = () => {
    //     if(loggedIn) {
    //         return <p>Login Success!</p>
    //     }
    //     else {
    //         <p>Login failed</p>
    //     }
    // }

const handleInput = e => {
    const { name, value } = e.target
    setUserinfo({
        ...userInfo,
        [name]: value
    })
    // setLogininfo({
    //     ...userInfo,
    //     [name]: value
    // })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios({
            method: 'post',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: userInfo
            
        })
        .then(result=>{
            console.log(result)
            localStorage.setItem('jwt', result.data.auth_token)
            setUserinLogin(result.data.user)
            setLoggedIn(true)
            alert("Successfully logged in!")
            history.push(`/`)
            toggle()
        })
        .catch(err => {
            console.log(err)
            alert('something went wrong')
        })
    
    }

    // const checkLoggedIn = () => {
    //     if(localStorage.getItem == (typeof stringValue)) {
    //         setLoggedIn(true)
    //     }
    // }


   return(
       

   <form style={formStyle} onSubmit={handleSubmit}>
    
    {/* {checkLoggedIn()} */}

        <input
        type="text" 
        placeholder="Username" 
        name="username"
        onChange={handleInput}/>
        {/* {displayHelperMessage()} */}


        <input 
        type="password" 
        placeholder="Password"
        name="password"
        onChange={handleInput} />

        <input 
        className="btn btn-infor" 
        type="submit"
        // disabled={loading}
        // value={loading ? 'Signing Up...' : 'Sign Up!'}
        />
    
    </form>

   )
}

export default LoginForm