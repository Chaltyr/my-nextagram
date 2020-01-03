import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { Route } from 'react-router-dom'
import ErrorUploadPage from './ErrorUploadPage'


const UploadPage = () => {

    // if (localStorage.getItem("jwt") !== null){
    //     <ErrorUploadPage to="/errorupload" />
    // }
    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')

    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        let JWT = localStorage.getItem("jwt")
        let formData = new FormData()
        formData.append("image", imageFile)


        axios.post(`https://insta.nextacademy.com/api/v1/images/`, formData,
        {headers: {
        Authorization:`Bearer ${JWT}`
        }})
        .then(result =>{
            // console.log("world")
            console.log(result.data)
            setMessage("Upload successful!!1111!!!")
            setPreviewImage(null)
            setImageFile(null)
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    const handleInput = e => {
        e.preventDefault()
        setImageFile(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }

    // const handlePreview = e => {
    //     e.preventDefault()
    // }
    const checkLogin = () => {
        if(localStorage.getItem("jwt") === null) {
            history.push("/errorUploadPage")
        }
        // <h1>
        //     hello
        // </h1>
    }

        return(
            <div>
                 {checkLogin()}
                <form>
                    <div className="card">
                        {previewImage ? (
                        <img
                        src={previewImage}
                        width="50%"
                        height="50%"
                        />
                        ) : (
                        <h3  className="text-center">
                        {message ? message : "Live Preview"}
                        </h3>
                        )}
                    </div>
                    <input  type="file" onChange={handleInput} multiple="false" />
                    <button onClick={handleSubmit}>Upload!!</button>
                </form>
            </div>
       
        )   
    }

export default UploadPage;
