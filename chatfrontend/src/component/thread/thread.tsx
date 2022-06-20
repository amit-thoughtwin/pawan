import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineMore,
  AiOutlineSend,
  AiFillMeh,
  AiOutlineAudio,
} from 'react-icons/ai';
import './thread.css';
import { useParams } from 'react-router-dom';
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import Picker from 'emoji-picker-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Overlay, Popover } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import TelegramDataService from '../../service/service';
import Message from '../message/message';

function Thread() {
  const [userDetails, setUserDetails] = useState<any>();
  const [frined, setFrined] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState('');
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [target, setTarget] = useState(null);
  const [frienship, setFriendship] = useState(false);

  const { transcript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  const { chatID } = useParams();

  const handleshow = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const {
    email, fullname, photoURL, uid,
  } = user;

  // useEffect(() => {
  //     async function getCities(chatID:any) {
  //         const docRef = collection(db, 'chats', chatID);
  //         const docSnap: any = await getDocs(docRef);

  //         setUserDetails(docSnap);
  //     }
  //     getCities(chatID)
  // }, [chatID]);

  const getdata = async () => {
    const docSnap: any = await TelegramDataService.getchat(chatID);
    const friendKey: any = docSnap.data().frndid === uid
      ? docSnap.data().sendid
      : docSnap.data().sendid === uid && docSnap.data().frndid;

    setFriendship(docSnap.data().frined);

    setFrined(docSnap?.data()?.frined);

    if (friendKey !== '') {
      TelegramDataService.getchatuser(friendKey).then((res) => {
        setUserDetails(res?.data()?.newUser);
      });
    }
  };

  useEffect(() => {
    if (chatID !== undefined && chatID !== '') {
      getdata();
    }
  }, [chatID]);

  const getmessagedata = async (id: any) => {
    const getchatdata = doc(db, 'chats', id);
    const colRef = collection(getchatdata, 'messages');
    onSnapshot(colRef, (querySnapshot) => {
      const array: any = [];
      querySnapshot?.forEach((item: any) => {
        array.push({ ...item.data(), id: item.id });
      });
      setMessages(array);
      for (let i = 0; i <= array.length; i += 1) {
        if (array[i] && array[i].uid !== uid) {
          (async function () {
            await updateDoc(doc(db, `chats/${id}/messages`, array[i].id), {
              isread: true,
            });
          }());
        }
      }
    });

    // const docnap: any = await TelegramDataService.getMessages(chatID);
    // setMessages(docnap.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));

    // const docSnap:any = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    // if (docSnap.data() && docSnap.data().uid !==uid) {
    //   update last message doc, set unread to false
    //   await updateDoc(doc(db, "lastMsg", id), { isread: false });
    // }
  };
  // useEffect(()=>{
  //     console.log("aayush",messages)
  // },[messages])

  useEffect(() => {
    if (chatID !== undefined && chatID !== '') {
      getmessagedata(chatID);
    }
  }, [chatID]);

  const addMessage = {
    msg: input,
    uid,
    photoUrl: photoURL,
    email,
    displayName: fullname,
    isread: false,
    timestamp: serverTimestamp(),
  };
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (chatID !== undefined && chatID !== '') {
      await TelegramDataService.Addmessages(chatID, addMessage).then(() => getmessagedata(chatID));
      await setDoc(doc(db, 'lastMsg', chatID), {
        message: input,
        uid,
        createdAt: Timestamp.fromDate(new Date()),
        // isread: true,
      });
      setInput('');
    }
  };
  const handleListing = () => {
    setIsListening(!isListening);
    SpeechRecognition.startListening({
      continuous: true,
    });
    if (isListening) {
      SpeechRecognition.stopListening();
    }
  };

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const unfriend = async () => {
    setShow(false);
    if (chatID !== undefined && chatID !== '' && frined === true) {
      setFriendship((prev) => !prev);
      const noteRef = doc(db, 'chats', chatID);
      await updateDoc(noteRef, {
        frined: false,
      });
    }
    if (chatID !== undefined && chatID !== '' && frined === false) {
      setFriendship((prev) => !prev);
      const noteRef = doc(db, 'chats', chatID);
      await updateDoc(noteRef, {
        frined: true,
      });
    }
  };

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__headerDetails">
          <Avatar />

          <div className="thread__headerDetails_info">
            <h4>{userDetails?.email}</h4>
            {/* <h5>Just Now</h5> */}
          </div>
        </div>

        <div className="thread__headerMoreHoriz">
          <AiOutlineMore className="thread_morebutton" onClick={handleshow} />
        </div>
        <Overlay show={show} placement="bottom" target={target}>
          <Popover>
            <Popover.Body>
              <div tabIndex={0} role="button" onClick={unfriend} onKeyDown={unfriend}>{!frienship ? 'Unfriend' : 'Friend'}</div>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
      <div className="thread__messages">
        {messages.map((item: any) => (
          <Message key={item.id} message={item} />
        ))}
        {/* <Message /> */}
      </div>
      {!frienship && (
        <div className="thread__input">
          <div className="Emo-picker">
            {openEmojiBox && (
              <Picker
                onEmojiClick={(event, emojiObject) => setInput(input + emojiObject.emoji)}
              />
            )}
          </div>
          <div className="chat-input-btn">
            <AiFillMeh
              onClick={() => setOpenEmojiBox((openEmojiBoxs) => !openEmojiBoxs)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <form>
            <input
              placeholder="Enter a message.."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div>
              <AiOutlineSend onClick={sendMessage} />
            </div>
            <div>
              <AiOutlineAudio
                style={{
                  backgroundColor: isListening ? 'salmon' : '',
                  color: isListening ? 'white' : '',
                }}
                onClick={handleListing}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Thread;
