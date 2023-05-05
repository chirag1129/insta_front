// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAL6U7zxTNP1S5SnvEr7s0BiXf3ditlKls",
  authDomain: "insta-clone-18002.firebaseapp.com",
  databaseURL: "https://insta-clone-18002-default-rtdb.firebaseio.com",
  projectId: "insta-clone-18002",
  storageBucket: "insta-clone-18002.appspot.com",
  messagingSenderId: "90239693357",
  appId: "1:90239693357:web:e8c88fdfa44ea734d2bea4",
  measurementId: "G-HT7E0BCXF9"
})

const db =firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

  export {db,auth,storage}