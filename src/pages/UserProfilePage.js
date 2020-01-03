import React from "react"
import { useParams } from "react-router-dom"
import UserProfileImages from "../components/UserProfileImages"
import UserImg from "../components/UserImages"
import UploadPage from "./UploadPage"

const UserProfilePage = () => {
   

    let { id } = useParams()
  
  return (
    <div>
        <div>ID:{id}</div>
        <UserImg userId = {id} />
        <br />
        <UserProfileImages id = {id}/>
        {/* <UploadPage /> */}
    </div>
  )
}

export default UserProfilePage