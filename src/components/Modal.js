import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginForm from './Login'
import SignUpForm from './Signup'
import { useHistory } from 'react-router-dom'



const modalStyle = {
    position: "fixed",
    // paddingTop: "100p",
     /* Location of the box - don't know what this does?  If it is to move your modal down by 100px, then just change top below to 100px and remove this*/
    // // // left: 0;
    outline: "0",
    backgroundColor: "rgb(0,0,0)",
    // // // right:0; /* Full width (left and right 0) */
    top: "30vh",
    left:"30%",
    height: "40vh",
    width: "40vw",
    // // // bottom: 0; /* Full height top and bottom 0 */
    // // overflow: auto; /* Enable scroll if needed */
    // backgroundColor: "rgb(0,100,0)", /* Fallback color */
    // backgroundColor: "rgba(0,0,0,0.4)", /* Black w/ opacity */
    zIndex: "1050" /* Sit on top - higher than any other z-index in your site*/
}
const MyModal = (props) => {
    const [showmodal, setshowModal] = useState(false)
    const [showLogin, setshowLogin] = useState(false)
    const [modalButton, setmodalButton] = useState(false)
    const toggle = () => setshowModal(!showmodal);
    const toggleForm = () => setshowLogin(!showLogin)

    const history = useHistory()



    const logout = () => {
        localStorage.removeItem('jwt')
        props.setUserinLogin({})
        history.push("/")
        // window.location.reload()
    }
    console.log(props.user, Object.keys(props.user))
    return (
        <div>
      {
        Object.keys(props.user).length === 0 ?
        <Button color="danger" onClick={toggle}>Login / Signup</Button> :
        <Button color="danger" onClick={() => {logout()}}>Logout</Button>
      }
      <Modal isOpen={showmodal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            {showLogin ? <LoginForm toggle={toggle} user={props.user} setUserinLogin={props.setUserinLogin} /> : <SignUpForm toggle={toggle}/> }
                <a onClick={toggleForm} className="d-block" href="#">
                    {showLogin
                    ? 'Not a member? Click here to sign up!'
                    : 'Click here to log in'}
                </a>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    )
}

export default MyModal