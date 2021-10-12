import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAwz7UghKwbsLUYp6U3czwX9IP4mrg0XmA",
    authDomain: "chatapp-project-c9a48.firebaseapp.com",
    projectId: "chatapp-project-c9a48",
    storageBucket: "chatapp-project-c9a48.appspot.com",
    messagingSenderId: "402999029473",
    appId: "1:402999029473:web:5bfb761967fc5ead2811a0"
  };

  let app;

  if (firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app();
  }
  
  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};