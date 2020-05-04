import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAEff60ts-Aiy3up8ZrMe_7odu40qaYNlk",
    authDomain: "todo-app-317db.firebaseapp.com",
    databaseURL: "https://todo-app-317db.firebaseio.com",
    projectId: "todo-app-317db",
    storageBucket: "todo-app-317db.appspot.com",
    messagingSenderId: "661380363040",
    appId: "1:661380363040:web:09bd1be97e6a33e5765d45"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()