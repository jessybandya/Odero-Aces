import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLXSPti08D9lynzBA8e9pfBz7R5PiYxXM",
    authDomain: "odero-85bdb.firebaseapp.com",
    projectId: "odero-85bdb",
    storageBucket: "odero-85bdb.appspot.com",
    messagingSenderId: "437962805696",
    appId: "1:437962805696:web:2ed9b8f9eddbc1a1637825",
    measurementId: "G-RR75VG7ELL"
  };
  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db};
  export  {auth};
  export  {storage};