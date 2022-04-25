import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBDJ2g7iuPWEWAKGqToBc9Vqi0_JQeBW98",
  authDomain: "fir-28639.firebaseapp.com",
  projectId: "fir-28639",
  storageBucket: "fir-28639.appspot.com",
  messagingSenderId: "230457981269",
  appId: "1:230457981269:web:4854d7138654b9a2f857dc",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export default db;
