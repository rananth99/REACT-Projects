// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCc0msLD1fFFScTKcAOEPHsVrc2gJauQeQ",
    authDomain: "facebook-messenger-clone-6f658.firebaseapp.com",
    projectId: "facebook-messenger-clone-6f658",
    storageBucket: "facebook-messenger-clone-6f658.appspot.com",
    messagingSenderId: "255817365481",
    appId: "1:255817365481:web:9d78f6d00117d275bb3d78",
    measurementId: "G-WLXG8EMNRX"
});

const db = firebaseApp.firestore();

export default db;