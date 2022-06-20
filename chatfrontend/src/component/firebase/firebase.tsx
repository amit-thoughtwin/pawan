import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyASJxrtRxt4AgphVezlpyz702PdHGKcrhQ',
  authDomain: 'frontendchatapp.firebaseapp.com',
  projectId: 'frontendchatapp',
  storageBucket: 'frontendchatapp.appspot.com',
  messagingSenderId: '943067889712',
  appId: '1:943067889712:web:6568398f7c48922420adf5',
  measurementId: 'G-DZZX4755BW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
