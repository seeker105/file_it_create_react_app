import {history} from '../App';
import firebase from '../firebase/firebase';
import store from '../store/configureStore';

export const setFileNames = (fileNames) => {
  return {
    type: 'SET_FILENAMES',
    fileNames
  }
}

export const startLoadFileNames = () => {
  return (dispatch, getState) => {
    const user = getState().credential.user;
    return firebase.database().ref('users/' + user.uid + '/files/').once('value')
      .then((snapshot) => {
        const fileNames = [];
        snapshot.forEach( (childSnapshot) => {
          // console.log(childSnapshot.key);

          fileNames.push({
            id: childSnapshot.key,
            filename: childSnapshot.val()
          })

          // fileNames.push(childSnapshot.val())
        })
        dispatch(setFileNames(fileNames));
      })
  }
}

export const loadDashBoard = () => {
  history.push('/loading-page');
  store.dispatch(startLoadFileNames()).then(() => {
    history.push('/dashboard');
  })
}
