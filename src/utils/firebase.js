import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import {
  getAuth,
  //signInWithPopup,
  signInWithEmailAndPassword,
  //createUserWithEmailAndPassword,
  //sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.europe-west1.firebasedatabase.app`,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)


//Auth

const logInWithEmailAndPassword = async (user, password) => {
  try {
    await signInWithEmailAndPassword(auth, user+"@jamap.fr", password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  database,
  logInWithEmailAndPassword,
  logout
}