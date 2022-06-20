/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';

interface IModalProps {
    isOpen?:boolean,
    toggle?:any
}

function Showmodal(props:IModalProps) {
  console.log('>>>>>>>>', props);
  return (
    <div>modal</div>
  );
}

export default Showmodal;

// import React,{useState} from "react";
// import { Button, Form, Modal, ModalBody } from "react-bootstrap";
// import { db } from "../firebase/firebase";

// interface IModalProps {
//   isOpen?:boolean,
//   toggle?:any
// }

// const Showmodal = ({isOpen, toggle }:IModalProps) => {

//   const [userlist,setUserlist]=useState("")

//   const addChat = (e: React.ChangeEventHandler<HTMLInputElement>) =>{
//     e.preventDefault()

//   }

//   return(

//     <Modal show={isOpen} onHide={toggle}>
//     <Modal.Header closeButton>
//       {/* <Modal.Title>Modal heading</Modal.Title> */}
//     </Modal.Header>
//     <Modal.Body >
//     <Form.Group >
//               <Form.Label>Name: </Form.Label>
//               <Form.Control type="text" onChange={} value={this.state.name} placeholder="name input"/>
//           </Form.Group>
//     </Modal.Body>
//     <Modal.Footer>
//           <Button variant="primary" type="submit" onClick={addChat}>
//               Submit
//           </Button>
//       </Modal.Footer>

//   </Modal>

//   )
//   };

// export default Showmodal
