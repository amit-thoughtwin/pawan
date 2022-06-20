// import React, { useState } from 'react'
// import { Button, Col, Container, Form, Row } from 'react-bootstrap'
// import './login.css';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// const Login = () => {
//     const auth = getAuth();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [authing, setAuthing] = useState(false);

//     const handlelogin = (e: any) => {
//         e.preventDefault()
//         console.log(e.target)

//     }
// const signInWithGoogle = async () => {
//     setAuthing(true);

//     signInWithPopup(auth, new GoogleAuthProvider())
//         .then((response) => {
//             console.log("<<<<<<<<<<<<<<<<<<<<<<<<<",response.user);

//         })
//         .catch((error) => {
//             console.log(error);
//             setAuthing(false);
//         });
// };
//     return (
//         <>

//             <Container>
//                 <Row className="justify-content-lg-center">
//                     <Col lg={4} >
//                         <div className='loginlogocenter'>

//                             <h2>TELEGRAM</h2>
//                         </div>
//                         <div>

//                             <Form onSubmit={handlelogin}>
//                                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                                     <Form.Label>Email address</Form.Label>
//                                     <Form.Control type="email" placeholder="Enter email" value={email}
//                                         onChange={(e) => setEmail(e.target.value)} />

//                                 </Form.Group>

//                                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                                     <Form.Label>Password</Form.Label>
//                                     <Form.Control type="password" placeholder="Password" value={password}
//                                         onChange={(e) => setPassword(e.target.value)} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                                     <Form.Check type="checkbox" label="keep login me!" />
//                                 </Form.Group>
//                                 <Button variant="primary" type="submit">
//                                     LOGIN
//                                 </Button>
//                             </Form>
//                             {/* <span className="googleicon" onClick={(event) => {
//                                 event.preventDefault();
//                                 signInWithGoogle();
//                             }}><AiOutlineGooglePlus /> google</span> */}
//                             <div>
//                                 <button onClick={() => signInWithGoogle()} disabled={authing}>
//                                     Sign in with Google
//                                 </button>

//                             </div>
//                         </div>

//                     </Col>

//                 </Row>
//             </Container>

//         </>
//     )
// }

// export default Login

// useEffect(() => {
//     const citiesCol = collection(db, 'chats');
//     const unsubscribe = onSnapshot(citiesCol, (querySnapshot) => {
//       let array: any = []
//       for(let i = 0; i<querySnapshot?.docChanges()?.length ; i++){
//         TelegramDataService.getchatuser(querySnapshot?.docChanges()[i]?.doc?.data()?.frndid)?.then((res)=>{
//           array.push({...querySnapshot?.docChanges()[i]?.doc.data(),email : res?.data()?.newUser?.email})
//         })
//       }
//       // querySnapshot?.docChanges().forEach((item: any) => {

//       //   array.push({ ...item.doc.data(), id: item.doc.id });
//       // })
//       console.log("pawan????????",array)
//       setChats(array);
//     })
//   }, []);

// onClick={() => setShow(!show)}

// onClick={() => sendrequest(post.data().newUser?.uid)}

// useEffect(() => {
//     const citiesCol = collection(db, 'chats');
//     const unsubscribe = onSnapshot(citiesCol, (querySnapshot) => {
//       let array: any = []
//       querySnapshot?.docChanges().forEach((item: any) => {
//         // array.push({ ...item.doc.data(), id: item.doc.id });

// const lst = item.doc.data();
// const id = lst.frndid

//         console.log("pawan????????",id)

// if( id!== undefined && id !== ""){
//           const citiesCol = collection(db, "users", id);
//           const unsubscribe = onSnapshot(citiesCol, (querySnapshot) => {
//             let array: any = []
//             querySnapshot?.docChanges().forEach((item: any) => {
//               array.push({ ...item.doc.data(), id: item.doc.id });
//             })
//             setChats(array);
//           })

//         }

//       })
//     })
//   }, []);

// var friendKey = '';
// if (item.frndid === email) {
//   friendKey = item.sendid;
// }
// else if (item.sendid === email) {
//   friendKey = item.frndid;
// }

// useEffect(() => {
//     const citiesCol = collection(db, 'chats');
//     const unsubscribe = onSnapshot(citiesCol, (querySnapshot) => {
//       let array: any = []
//       querySnapshot?.docChanges().forEach((item: any) => {
//         array.push({ ...item.doc.data(), id: item.doc.id });
//       })
//       console.log("pawan????????",array)
//       setChats(array);
//     })
//   }, []);

// useEffect(() => {
//     const citiesCol = collection(db, 'chats');
//     const unsubscribe = onSnapshot(citiesCol, (querySnapshot) => {
//       let array: any = []
//       querySnapshot?.docChanges().forEach((item: any) => {
//         const lst = item.doc.data();
//         const id = lst.frndid

//         if(id!== undefined && id !== ""){

//           array.push({ ...item.doc.data(), id: item.doc.id });
//         }
//       })
//       // console.log("pawan????????",array)
//       setChats(array);
//     })
//   }, []);

// {searchInput.length > 0 &&

//         allUsers.filter((post: any) => {
//           if (searchInput === "") {
//             return post;
//           } else if (post.data().newUser?.email?.toLowerCase().includes(searchInput.toLowerCase())) {
//             return post;
//           }
//         }).map((post: any, index) => {
//           const check: any = notification[0];
//           return <div className="box" key={index}>
//             <p>{post.data().newUser?.email}
//               <span className="sendrequest" onClick={() => sendrequest(post?.id)}>
//                 {!notification || notification?.length < 1 ? "Sent Request" : check?.friendid === uid ? "Pending" : "Sent"}
//               </span>
//             </p>
//           </div>;
//         })

//       }

// {searchInput.length > 0 &&

//         allUsers.filter((post: any) => {
//           if (searchInput === "") {
//             return post;
//           } else if (post.data().newUser?.email?.toLowerCase().includes(searchInput.toLowerCase())) {
//             return post;
//           }
//         }).map((post: any, index) => {
//           console.log("p............", post.data().newUser?.email)
//           const check: any = notification[0];
//           console.log("pawan????????????", notification)
//           console.log(".,.,.,.", check?.friendid)
//           console.log(">?>?>?>?>", uid)
//           if(!notification || notification?.length < 1){
//             return <div className="box" key={index}>
//               <p>{post.data().newUser?.email} <span className="sendrequest" onClick={() => sendrequest(post?.id)}>Sent Request</span></p>
//             </div>;

//           }
//            if (check?.friendid === uid) {
//             return <div className="box" key={index}>
//               <p>{post.data().newUser?.email} <span className="sendrequest">Pending</span></p>
//             </div>;
//           }
//            if(check?.senderuid === uid) {
//             return <div className="box" key={index}>
//               <p>{post.data().newUser?.email} <span className="sendrequest" >Sent</span></p>
//             </div>
//           }
//         })

//       }

// && check?.status ==="Reject"

// {notification.map((post: any, index: any) => {
//         console.log("pawan>>>>>>>>>>",)
//         if (post.status === "pending" && post.senderuid !== uid) {
//           return <div className="notificationpopup" key={index}>
//             <p>{post.email} </p>
//             <p>
//               <span className="notificationpopupbtn" onClick={() => Reject(post.id)} >Reject</span>
//               <span className="notificationpopupbtn" onClick={() => Accept(post.id, post)}>Accept</span>
//             </p>

//             {/* <p>{post.value}</p> */}
//           </div>;
//         } else {
//           return <div>No Data Available....</div>

//         }

//       })}

// {searchInput.length > 0 &&

//         allUsers.filter((post: any) => {
//           if (searchInput === "") {
//             return post;
//           } else if (post.data().newUser?.email?.toLowerCase().includes(searchInput.toLowerCase())) {
//             return post;
//           }
//         }).map((post: any, index) => {
//           console.log("p............", post.data().newUser?.email)
//           const check: any = notification[0];

//           if(!notification || notification?.length < 1){
//             return <div className="box" key={index}>
//               <p>{post.data().newUser?.email} <span className="sendrequest" onClick={() => sendrequest(post?.id)}>Sent Request</span></p>
//             </div>;

//           }
//            if (check?.friendid === uid) {
//             return <div className="box" key={index}>
//               <p>{post.data().newUser?.email} <span className="sendrequest">Pending</span></p>
//             </div>;
//           }
//            if(check?.senderuid === uid){
//             return <div className="box" key={index}>
//               <p>{post.data().newUser?.email} <span className="sendrequest" >Sent</span></p>
//             </div>
//           }
//         })

//       }

// const getmessagedata = async (id:any) => {
//         let newMessages = [...messages]
//         const getchatdata = doc(db, "chats", id);
//             let colRef = collection(getchatdata, "messages")
//             const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
//                 let array:any = []
//                 querySnapshot?.docChanges().forEach((item : any)=>{
//                     array.push(item.doc.data());
//                 })
//                 if(messages?.length){
//                     setMessages([...newMessages,...array])
//                 }
//                 else{
//                     setMessages(array);
//                 }
//         })
// const docnap: any = await TelegramDataService.getMessages(chatID);
// setMessages(docnap.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));

//     };
// useEffect(()=>{
//     console.log("aayush",messages)
// },[messages])

//     const getmessagedata = async (id:any) => {

//         const getchatdata = doc(db, "chats", id);
//             let colRef = collection(getchatdata, "messages")
//             const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
//                 let array:any = []
//                 querySnapshot?.forEach((item : any)=>{
//                     array.push(item.data());
//                 })
//                 setMessages(array);
//         })
// const docnap: any = await TelegramDataService.getMessages(chatID);
// setMessages(docnap.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));

//     };
// useEffect(()=>{
//     console.log("aayush",messages)
// },[messages])

//     {notification.map((post: any, index: any) => {
//         if (post.status === "pending" && post.senderuid !== uid) {
//           return <div className="notificationpopup" key={index}>
//             <p>{post.email} </p>
//             <p>
//               <span className="notificationpopupbtn" onClick={() => Reject(post.id)} >Reject</span>
//               <span className="notificationpopupbtn" onClick={() => Accept(post.id, post)}>Accept</span>
//             </p>

//             {/* <p>{post.value}</p> */}
//           </div>;
//         }
// if(!notification || notification?.length < 1 && post.status==="Reject"||post.status==="Accept"){
//   return <div>No Data Available....</div>

// }

//       })}
