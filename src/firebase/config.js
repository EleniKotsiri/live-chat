import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth' // import firebase auth to use authentication services

const firebaseConfig = {
  apiKey: "AIzaSyC5CmpBbioAb7BPFkjyxZWxFf9B0MN0Y38",
  authDomain: "vue-firebase-projects-446f5.firebaseapp.com",
  projectId: "vue-firebase-projects-446f5",
  storageBucket: "vue-firebase-projects-446f5.appspot.com",
  messagingSenderId: "506902671299",
  appId: "1:506902671299:web:f1c83b6da2a7fa5cf8d776"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firebase auth
const projectAuth = firebase.auth()
// init firestore
const projectFirestore = firebase.firestore()
// real-time data
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp, projectAuth }