// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCdUwDD1hpsCRKEQAiHL8EgWD6sipri3Aw",
        authDomain: "todo-app-874b8.firebaseapp.com",
        projectId: "todo-app-874b8",
        storageBucket: "todo-app-874b8.appspot.com",
        messagingSenderId: "586359775830",
        appId: "1:586359775830:web:e6d3387396393cde2111f7",
        measurementId: "G-R454DCZ4EL"
});

const db = firebaseApp.firestore();

export default db;