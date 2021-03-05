import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOJ9tDbOgd4sTHhJAULJ5poWOWA-m4GJg",
    authDomain: "chatrooms-01.firebaseapp.com",
    databaseURL: "https://chatrooms-01.firebaseio.com",
    projectId: "chatrooms-01",
    storageBucket: "chatrooms-01.appspot.com",
    messagingSenderId: "158745491292",
    appId: "1:158745491292:web:9cdd0a9ceedacde3b77399",
    measurementId: "G-MB1WHWSQ3G"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export { firebaseApp };
export default db;