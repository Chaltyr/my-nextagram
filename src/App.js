// Remember to import the library before using it
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Homepage';
import Nav from './components/nav';
import { Route, Link, useParams } from "react-router-dom"
import UserProfilePage from "./pages/UserProfilePage"
import { ToastContainer } from 'react-toastify';
import UploadPage from './pages/UploadPage';
import ErrorUploadPage from './pages/ErrorUploadPage';


function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})



    // useEffect has two arguments
    // first argument is a function
    // second argument is an array
    // when there is a change in state, the function in the first argument will run
    // the second argument is an array of states
    // 
  // function p() {
  //   console.log('p sdf')
  // }
  
  const setUserinLogin = (user) => {
    setUser(user)
  }

  useEffect(() => {

   
    // console.log("hello")
    if(localStorage.getItem('jwt')){
      console.log(localStorage.getItem('jwt'))
      axios.get(`https://insta.nextacademy.com/api/v1/users/me`,
      {headers: {
       Authorization:`Bearer ${localStorage.getItem('jwt')}`
      }})
      .then(result =>{
        console.log("world")
        console.log(result.data)
        setUser(result.data)
      })
     
    }

    // performing a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      // If successful, we do stuffs with 'result'
      setUsers(result.data)
      setIsLoading(false)
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log('ERROR: ', error)
    })
  }, [])

   if (isLoading === true) {
    return <h1>Loading...</h1>
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

  return (
    <div>
      <ToastContainer />

      <Nav user={user} setUserinLogin={setUserinLogin}/>
      <Route exact path="/" render={() => <HomePage usersFromApp={users}/>}  /> 
      <Route path="/users/:id" component={UserProfilePage} />
      <Route path="/upload" component={UploadPage} />
      <Route path="/errorUploadPage" component={ErrorUploadPage} />
    </div>
  );
} 
export default App;
