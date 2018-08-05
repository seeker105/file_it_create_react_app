import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyDod6DA83q2ScDKUvc_icUP_U8tCwL0Ifc",
  authDomain: "fileit-2a109.firebaseapp.com",
  databaseURL: "https://fileit-2a109.firebaseio.com",
  projectId: "fileit-2a109",
  storageBucket: "fileit-2a109.appspot.com",
  messagingSenderId: "524858754740"
};

firebase.initializeApp(config);

export {firebase};
