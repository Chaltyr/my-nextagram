import React, { useEffect, useState } from "react"
import Axios from "axios"

const UserProfileImages = (props) => {
    const [user, setUser] = useState([])
    
    useEffect (() => {
        Axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${props.id}`)
        .then(result => {
            // console.log(result)
            setUser(result.data)
        })
    }, [])

    return(
        user.map(i => {
            return (<img style={{ height: '50px', width: '50px' }} src={i}/>)
        })
    )
}



export default UserProfileImages