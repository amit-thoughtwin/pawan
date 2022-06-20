import React from 'react';
import { Avatar } from '@mui/material';
import { AiFillCheckCircle } from 'react-icons/ai';
import { auth } from '../firebase/firebase';
import './message.css';

// interface IProps {
//     id:string,
//     message:string,
//     email:string,
//     photoUrl:string,
//     uid:string,
//     }

function Message(props: any) {
  const { message } = props;
  const {
    photoUrl, msg, uid, isread, timestamp,
  } = message;

  const messageClass = uid === auth?.currentUser?.uid ? 'message__sender' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <div className="message_photo">
        <Avatar src={photoUrl} alt="img" />
      </div>
      <div className="message__contents">
        <p className="message_content">
          <span>
            <AiFillCheckCircle
              className={isread ? 'readunraedmsgsen' : 'readunraedmsgrec'}
            />
          </span>
          {msg}
        </p>
        <small className="message_timestamp">
          {new Date(timestamp?.toDate())?.toLocaleString()}
        </small>
      </div>
    </div>
  );
}

export default Message;
