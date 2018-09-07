import {history} from '../App';
import firebase from '../firebase/firebase';

export const storeUserData = (firstName, lastName, email, accountType) => {
  return {
    type: 'STORE_USER_DATA',
    firstName,
    lastName,
    email,
    accountType
  }
};

export const storeUserName = (firstName, lastName) => {
  return {
    type: 'STORE_USER_NAME',
    firstName,
    lastName
  }
}

export const storeUserCredential = (credential) => {
  return {
    type: 'STORE_USER_CREDENTIAL',
    credential
  }
};

export const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL',
    email
  }
};

export const setOrderValues = (newAccountType) => {
  return {
    type: 'SET_ORDER_VALUES',
    newAccountType
  }
};

export const setAccountType = (accountType) => {
  return {
    type: 'SET_ACCOUNT_TYPE',
    accountType
  }
};

export const startUpdateEmail = (email) => {
  console.log("hits start update")
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    return user.updateEmail(email)
      .then(() => {
        dispatch(updateEmail(email));
        history.push('/profile-page')
      })
  }
}