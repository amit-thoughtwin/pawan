import React, { useEffect, useState } from 'react';
import './sidebar.css';
import {
  AiOutlineBell,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineAlignLeft,
} from 'react-icons/ai';
import { Avatar } from '@mui/material';
// import Showmodal from '../modal/modal';
import { signOut } from 'firebase/auth';
import { Overlay, Popover } from 'react-bootstrap';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import TelegramDataService from '../../service/service';
import Sidebarthread from '../Sidebarthread/Sidebarthread';
import { auth, db } from '../firebase/firebase';

function Sidebar() {
  const [show, setShow] = useState<boolean>(false);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState<any>([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [target, setTarget] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 600,
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const {
    email, fullname, photoURL, uid,
  } = user;

  const handleshow = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  const signout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('user');
        navigate('/');
      })
      .catch((err) => alert(err.message));
  };

  //   useEffect(() => {
  //     async function getCities() {
  // const citiesCol = collection(db, 'chats');
  // const citySnapshot = await getDocs(citiesCol);

  //         const cityList: any = citySnapshot.docs.map(doc => ({
  //                 id: doc.id,
  //                 data: doc.data()
  //             }));
  //             setChats(cityList);
  //     }
  //     getCities()
  // }, []);
  // useEffect(() => {
  //   getchats();
  // }, []);

  // const getchats = async () => {
  //   const data: any = await TelegramDataService.getAllChats();
  //   setChats(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
  // };

  useEffect(() => {
    const citiesCol = collection(db, 'chats');
    onSnapshot(citiesCol, (querySnapshot) => {
      const array: any = [];
      querySnapshot?.docChanges().forEach((item: any) => {
        array.push({ ...item.doc.data(), id: item.doc.id });
      });
      setChats(array);
    });
  }, []);

  // const addChat = () => {

  //   const chatName = prompt('Please enter a chat name')
  //   if (chatName) {
  //     addDoc(collection(db, "chats"), {
  // chatName: chatName,
  // timestamp: serverTimestamp()
  //     });

  //   }

  // }

  // const addChat = async () => {

  //   const chatName = prompt('Please enter a chat name')
  //   const addChat = {
  //     chatName: chatName

  //   };
  //   if (addChat) {
  //     await TelegramDataService.addChats(addChat);
  //   }
  // }

  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const data = await db.collection("users").onSnapshot((snapshot) => {
  //       setAllUsers(
  //         snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
  //       );
  //     });
  //   };
  const getAllUsers = async () => {
    const data: any = await TelegramDataService.getAlluser();
    // setAllUsers(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    setAllUsers(
      data.docs.filter((dobc: any) => dobc.data().newUser?.email !== email),
    );
    // setAllUsers(data.docs.filter((doc: any) => doc.data().email !== email));
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const searchedUser = allUsers.filter((post: any) => {
    if (searchInput === '') {
      return post;
    }
    if (
      post
        .data()
        .newUser?.email?.toLowerCase()
        .includes(searchInput.toLowerCase())
    ) {
      return post;
    }
    return null;
  });

  // const searchedUser = allUsers.filter((user: any) => {
  //   // const searchfilter = user.data().newUser?.fullname
  //   // console.log(">>>>>>>>>>>>>>",searchfilter)
  //   if (searchInput) {
  //     if (
  //       user.data().newUser?.fullname?.toLowerCase().includes(searchInput.toLowerCase())
  //     ) {
  //       return user;
  //     }
  //   }
  // });

  // console.log(searchedUser)

  const sendrequest = async (id: any) => {
    try {
      if (id !== undefined && id !== '') {
        await addDoc(collection(db, 'notification'), {
          friendid: id,
          senderuid: uid,
          photoUrl: photoURL,
          displayName: fullname,
          email,
          status: 'pending',
        }).then(() => setRefresh(Math.random()));
      }
    } catch (err: any) {
      console.log({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    const citiesCol = collection(db, 'notification');
    onSnapshot(citiesCol, (querySnapshot) => {
      const array: any = [];
      querySnapshot?.docChanges().forEach((item: any) => {
        array.push({ ...item.doc.data(), id: item.doc.id });
      });
      setNotification(array);
    });
  }, [refresh]);

  /// /////////////

  // const check:any = notification[0]
  //   console.log("pawan......",check?.friendid)
  //   console.log("pawan......",check?.senderuid)

  const Reject = async (id: any) => {
    try {
      if (id !== undefined && id !== '') {
        const noteRef = doc(db, 'notification', id);
        await deleteDoc(noteRef);
      }
    } catch (err: any) {
      console.log({ error: true, msg: err.message });
    }
  };

  const Accept = async (id: any, p: any) => {
    try {
      const addChat = {
        frndid: p.friendid,
        sendid: p.senderuid,
        frined: false,
        timestamp: serverTimestamp(),
      };
      if (id !== undefined && id !== '') {
        const noteRef = doc(db, 'notification', id);
        await updateDoc(noteRef, {
          status: 'Accept',
        });
      }
      if (addChat) {
        await TelegramDataService.addChats(addChat);
      }
    } catch (err: any) {
      console.log({ error: true, msg: err.message });
    }
  };

  //   function NotificationCount() {
  //     let db = firebase.database().ref('notifications');

  //     db.orderByChild('sendTo').equalTo(currentUserKey).on('value', function (noti) {
  // let notiArray = Object.values(noti.val()).filter(n => n.status === 'Pending');
  // document.getElementById('notification').innerHTML = notiArray.length;
  //     });
  // }

  const notiArray = notification.filter(
    (n: any) => n.status === 'pending' && n.senderuid !== uid,
  );

  return (
    <>
      {mQuery && !mQuery.matches && (
        <AiOutlineAlignLeft className="sidebarbutton" onClick={handleshow} />
      )}
      {(show || mQuery.matches) && (
        <div className="sidebar">
          <div className="sidebar_header">
            <div className="sidebar_search">
              <AiOutlineSearch className="sidebar__searchIcon" />
              <input
                className="search_input"
                type="text"
                autoComplete="off"
                name="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="sidebar__button">
              {/* <AiOutlineUserAdd onClick={addChat} /> */}

              <AiOutlineUserAdd />

              {/* <AiOutlineUserAdd onClick={toggle}/> */}
              {/* <Showmodal isOpen={isOpen} toggle={toggle}/> */}
            </div>
          </div>

          {searchInput.length > 0
            && searchedUser.map((post: any) => {
              const check: any = notification[0];

              if (
                !notification
                || notification?.length < 1
                || check?.status === 'Reject'
              ) {
                return (
                  <div className="box" key={post}>
                    <p>
                      {post.data().newUser?.email}
                      <span
                        tabIndex={0}
                        role="button"
                        className="sendrequest"
                        key={post.id}
                        onClick={() => sendrequest(post?.id)}
                        onKeyDown={() => sendrequest(post?.id)}
                      >
                        Sent Request
                      </span>
                    </p>
                  </div>
                );
              }
              if (check?.friendid === uid) {
                return (
                  <div className="box" key={post}>
                    <p>
                      {post.data().newUser?.email}
                      <span className="sendrequest">
                        {check?.status === 'Accept' ? 'friends' : 'Pending'}
                      </span>
                    </p>
                  </div>
                );
              }
              if (check?.senderuid === uid) {
                return (
                  <div className="box" key={post}>
                    <p>
                      {post.data().newUser?.email}
                      <span className="sendrequest">
                        {check?.status === 'Accept' ? 'friends' : 'Sent'}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            })}
          {/* if(notification && notification.lengt>=0) */}

          <div className="sidebar__threads">
            {/* <Sidebarthread chatAdded={newChatAdded} /> */}
            {chats.map((item: any) => {
              let friendKey = '';
              if (item.frndid === uid) {
                friendKey = item.sendid;
              } else if (item.sendid === uid) {
                friendKey = item.frndid;
              }
              return (
                friendKey && (
                  <Sidebarthread
                    id={item.id}
                    key={item.id}
                    friend={friendKey}
                    // timestamp={item.timestamp}
                  />
                )
              );
            })}
          </div>
          <div className="sidebar_bottom">
            <Avatar
              className="sidebar__bottom_avatar"
              src={photoURL}
              alt="ser"
            />
            <div>
              <div>
                <AiOutlineBell
                  className="notificationbell"
                  onClick={handleshow}
                />
              </div>
              {notiArray === '' && (
                <div className="notnumber">
                  <p>{notiArray.length}</p>
                </div>
              )}
            </div>
            <button onClick={signout} type="button">Logout</button>
          </div>
          {
            <Overlay show={show} placement="top" target={target}>
              <Popover>
                <Popover.Body>
                  {!notification
                  || notification?.length < 1
                  || notification.status === 'pending' ? (
                    <div>No Data Available..</div>
                    ) : (
                      notification.map((post: any) => {
                        if (post.status === 'pending' && post.senderuid !== uid) {
                          return (
                            <div className="notificationpopup" key={post}>
                              <p>{post.email}</p>
                              <p>
                                <span
                                  tabIndex={0}
                                  role="button"
                                  className="notificationpopupbtn"
                                  onClick={() => Reject(post.id)}
                                  onKeyDown={() => Reject(post.id)}

                                >
                                  Reject
                                </span>
                                <span
                                  tabIndex={0}
                                  role="button"
                                  className="notificationpopupbtn"
                                  onClick={() => Accept(post.id, post)}
                                  onKeyDown={() => Accept(post.id, post)}
                                >
                                  Accept
                                </span>
                              </p>

                              {/* <p>{post.value}</p> */}
                            </div>
                          );
                        }
                        if (
                          post.status === 'Reject'
                        || post.status === 'Accept'
                        ) {
                          return <div>No Data Available....</div>;
                        }
                        return null;
                      })
                    )}
                </Popover.Body>
              </Popover>
            </Overlay>
          }
        </div>
      )}
    </>
  );
}

export default Sidebar;
