// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId
};

firebase.initializeApp(config);

export default firebase;

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
};

export const reauthenticate = (email, password) => {
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  const user = firebase.auth().currentUser;
  return user.reauthenticateAndRetrieveDataWithCredential(credential)
}

export const databaseSignOut = () => {
  firebase.auth().signOut();
}

export const uploadFile = (file) => {
  const user = firebase.auth().currentUser;
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const filesRef = storageRef.child('files/' + user.uid + '/' + file.name);
  filesRef.put(file);
  firebase.database().ref('users/' + user.uid + '/files').push(file.name);
}

export const changeName = (firstName, lastName) => {
  const user = firebase.auth().currentUser;
  const firstNamePromise = firebase.database().ref('users/' + user.uid + '/lastName').set(lastName);
  const lastNamePromise = user.updateProfile({
    displayName: firstName
  });
  return Promise.all([firstNamePromise, lastNamePromise]);
}

export const deleteAccount = () => {
  const user = firebase.auth().currentUser;
  firebase.database().ref('users/' + user.uid).remove()
  user.delete()
}