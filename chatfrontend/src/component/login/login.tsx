// // import { Link } from "react-router-dom";
// // import { useNavigate } from "react-router";
// import * as Yup from "yup";
// import { Formik, Form, ErrorMessage, Field } from "formik";
// // import { toast } from "react-toastify";
// import "./login.css";
// import { auth, db, provider } from "../firebase/firebase";
// import { useState } from "react";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { addDoc, collection } from "firebase/firestore";
// import { Link } from "react-router-dom";

// // interface MyFormValues {
// //     email: string;
// //     password: string;
// // }

// const Login = () => {
//     const [authing, setAuthing] = useState(false);
//     const initialValues:any = {
//         email: "",
//         password: "",
//     };

//     const EmailRegex = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//     const loginSchema = Yup.object({
//         email: Yup.string()
//             .email("Invalid email")
//             .required("Required")
//             .matches(EmailRegex, "email not validate"),
//         password: Yup.string()
//             .min(6, "Password Must br 8 Char")
//             .max(15, "Too Long!")
//             .required("Required")
//             .matches(passwordRegex, "Password not validate"),
//     });

//     const handleSubmit = async (event:Event) => {

//         event.preventDefault()
// try {
//     const res = await signInWithEmailAndPassword(auth, initialValues.email,
// initialValues.password);
//     // console.log("//////////////", res)
// } catch (err:any) {
//     console.error(err);
//     alert(err.message);
// }

//     };
//     const signInWithGoogle = async () => {
//         setAuthing(true);

//         signInWithPopup(auth, provider)
//             .then((response) => {
//                 // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<",response.user);

//             })
//             .catch((error) => {
//                 console.log(error);
//                 setAuthing(false);
//             });
//     };

//     return (
//         <div>
//             <div className="login_container">
//                 <div className="login_form_container">
//                     <Formik
//                         initialValues={initialValues}
//                         onSubmit={handleSubmit}
//                         validationSchema={loginSchema}
//                     >
//                         <div className="left">
//                             <Form className="form_container">
//                                 <h1>Login to Your Account</h1>

//                                 <Field
//                                     placeholder="Email"
//                                     name="email"
//                                     className="input"
//                                 />
//                                 <p className="text-danger">
//                                     <ErrorMessage name="email" />
//                                 </p>

//                                 <Field
//                                     type="password"
//                                     placeholder="Password"
//                                     name="password"
//                                     className="input"
//                                 />
//                                 <p className="text-danger">
//                                     <ErrorMessage name="password" />
//                                 </p>
//                                 <button type="submit" className="green_btn">
//                                     Login
//                                 </button>
//                             </Form>
//                         </div>

//                     </Formik>

//                     <div className="right">
//                         <h1>New Here ?</h1>

//                         <Link to="/register">
//               <button type="button" className="white_btn">
//                 Register
//               </button>
//             </Link>
//              <div className="googlesignin">
//                     <button onClick={() => signInWithGoogle()} disabled={authing}>
//                         Sign in with Google
//                     </button>

//                 </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router";
import * as Yup from 'yup';
import {
  Formik, Form, ErrorMessage, Field,
} from 'formik';
// import { toast } from "react-toastify";
import './login.css';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, provider } from '../firebase/firebase';

function Login({ refresh }: any) {
  const [authing, setAuthing] = useState(false);

    interface IFormValues {
        email: string;
        password: string;
    }
    // const navigate = useNavigate();
    const loginvalue = {
      email: '',
      password: '',
    };

    const EmailRegex = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const loginSchema = Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Required')
        .matches(EmailRegex, 'email not validate'),
      password: Yup.string()
        .min(6, 'Password Must br 8 Char')
        .max(15, 'Too Long!')
        .required('Required')
        .matches(passwordRegex, 'Password not validate'),
    });

    const handleSubmit = async (loginval:IFormValues) => {
      const { email, password } = loginval;
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const { user } = res;
        const newUser = {
          uid: user.uid,
          fullname: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        refresh(Math.random());
        // const docRef = await addDoc(collection(db, "users"), { newUser });
        const ref = doc(db, 'users', user?.uid);
        setDoc(ref, { newUser });
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      }
    };

    const signInWithGoogle = async () => {
      setAuthing(true);

      try {
        const res = await signInWithPopup(auth, provider);
        const { user } = res;
        const newUser = {
          uid: user.uid,
          fullname: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        refresh(Math.random());
        // const docRef = await addDoc(collection(db, 'users'), {newUser});
        const ref = doc(db, 'users', user?.uid);
        setDoc(ref, { newUser });
      } catch (err: any) {
        console.error(err);
        alert(err.message);
        setAuthing(false);
      }
    };

    return (
      <div data-testid="myrootdiv">
        <div className="login_container">
          <div className="login_form_container">
            <Formik
              initialValues={loginvalue}
              onSubmit={handleSubmit}
              validationSchema={loginSchema}
            >
              <div className="left">
                <Form className="form_container">
                  <h1>Login to Your Account</h1>

                  <Field
                    placeholder="Email"
                    name="email"
                    className="input"
                    data-inputId="email-input"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>

                  <Field
                    type="text"
                    placeholder="Password"
                    name="password"
                    className="input"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="password" />
                  </p>
                  <button type="submit" className="green_btn">
                    Login
                  </button>
                </Form>
              </div>

            </Formik>

            <div className="right">
              <h1>New Here ?</h1>

              <Link to="/register">
                <button type="button" className="white_btn">
                  Register
                </button>
              </Link>
              <div className="googlesignin">
                <button onClick={() => signInWithGoogle()} disabled={authing} type="button">
                  Sign in with Google
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    );
}

export default Login;
