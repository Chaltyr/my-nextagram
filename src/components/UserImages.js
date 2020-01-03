import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import App from 'App.js'


const UserImg = (props) => {

    const [userImg, setUserImg] = useState({}   )
    const imgStyle = {
        height: '50px',
        width: '50px'
    }

    useEffect(()=>{

            axios.get(`https://insta.nextacademy.com/api/v1/users/${props.userId}`)
            .then(result => {
                // console.log(result)
                setUserImg(result.data.profileImage)
            }
            
            )
         
    }, [])
    return(
        // <h1>hello</h1>
        // userImg.map(i => {
        //     return (<img style={{ height: '50px', width: '50px' }} src={i}/>)
        // })
        <img style={imgStyle} src={userImg}></img>
    )
}

export default UserImg