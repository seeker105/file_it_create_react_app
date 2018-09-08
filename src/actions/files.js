import {history} from '../App';
import firebase from '../firebase/firebase';
import store from '../store/configureStore';

export const setFilesData = (filesData) => {
  return {
    type: 'SET_FILES_DATA',
    filesData
  }
};

export const startLoadFilesData = () => {
  return (dispatch, getState) => {
    // const user = getState().credential.user;
    history.push('/loading-page');
    const user = firebase.auth().currentUser;
    return firebase.database().ref('users/' + user.uid + '/files/').once('value')
      .then((snapshot) => {
        const filesData = [];
        snapshot.forEach( (childSnapshot) => {
          filesData.push({
            id: childSnapshot.key,
            filename: childSnapshot.val()
          })
        });
        dispatch(setFilesData(filesData));
      })
  }
};

export const loadDashBoard = () => {
  store.dispatch(startLoadFilesData()).then(() => {
    history.push('/dashboard');
  })
};
