import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDiufZFYUoisibv6WJMq2pkNix4CzGl57s",
  authDomain: "notes-d2e2b.firebaseapp.com",
  databaseURL: "https://notes-d2e2b.firebaseio.com",
  projectId: "notes-d2e2b",
  storageBucket: "notes-d2e2b.appspot.com",
  messagingSenderId: "49773917369",
  appId: "1:49773917369:web:bc7b982f18c6beb9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
