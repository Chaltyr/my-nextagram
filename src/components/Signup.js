import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'



const formStyle = {
    display: "flex",
    flexDirection: 'column'
}

const SignupForm = ({toggle}) => {
    const history = useHistory()

    const [userInfo, setUserinfo] = useState({
        email:"",
        username:"",
        password:"",
        verifyPassword:""
    })

    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(null)
    const [validUser, setValidUser] = useState(null)
  
    const { email, username, password, verifyPassword } = userInfo


    // const [email, setEmail] = useState("")
    // const [Password, setPassword] = useState("")

    // const handleInput = e => {
    //     setUsername(e.target.value)
    //   }
    const displayHelperMessage = () => {
        if (validUser) {
          if (validUser === 'valid') {
            return <p className="text-success">Username is available!!</p>
          } else {
            return <p className="text-danger">Username has been taken!</p>
          }
        } else {
          return null
        }
      }
    
    
    const handleInput = e => {
    const { name, value } = e.target
    // if typing in 'username' field
    if (name === 'username') {
        setValidUser(null) // to clear info message
        clearTimeout(timer) // reset timer

        const newTimer = setTimeout(() => {
        // make api call to check if username is valid
        Axios.get(
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${value}`
        ).then(result => {
            setValidUser(result.data.valid ? 'valid' : 'invalid')
        })
        }, 500)
        setTimer(newTimer)
    }

    setUserinfo({
        ...userInfo,
        [name]: value
    })
    }
    
    
    const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    Axios.post('https://insta.nextacademy.com/api/v1/users/', {
        username,
        email,
        password,
    })
        .then(result => {
        const {user, message} = result.data
        console.log(result)

        setLoading(false)
        toast(message) // show popup message
        toggle() // close modal
        history.push(`/users/${user.id}`) // go to user profile page
        })
        // .catch(err => {
        // console.log(err.response)
        // err.response.data.message.forEach(msg => toast(msg))
        // setLoading(false)
        // })
    }
    
    return (
    <div>
        <form style={formStyle} onSubmit={handleSubmit}>
            <input 
            className="username" 
            name="username"
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={handleInput}/>
            {displayHelperMessage()}


            <input 
            className="email" 
            name="email"
            type="email" 
            value={email}
            placeholder="Email"
            onChange={handleInput}/>

            <input 
            className="Password"
            name="password" 
            type="password"
            value={password} 
            placeholder="Password"
            onChange={handleInput}/>

            <input 
            type="password" 
            name="verifyPassword"
            value={verifyPassword}
            placeholder="Confirm Password"
            onChange={handleInput}/>
            
            
            <input 
            className="btn btn-infor" 
            type="submit"
            disabled={loading}
            value={loading ? 'Signing Up...' : 'Sign Up!'}/>
        </form>
    </div> 
   

    )
}

export default SignupForm