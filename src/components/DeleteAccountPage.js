import React from 'react';
import {Link} from 'react-router-dom';
import store from '../store/configureStore';
import Header from './Header';
import {firebase} from '../firebase/firebase';
import {logoutGenerator} from '../actions/auth';

export default class ProfilePage extends React.Component {

  onMouseClick = (e) => {
    console.log('button clicked');

    const user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid).update(null)
      .then(() => {
        store.dispatch(logoutGenerator());
        return user.delete();
      })
      .catch(() => {
        alert("There was a problem closing your account.")
      })

  }

  render () {
    return (
      <div>
        <Header />
        <p>Are you sure you wish to delete your account? This CANNOT be undone</p>
        <button onClick={this.onMouseClick}>Delete Account</button>
        <Link to="/profile-page">Get me out of here</Link>
      </div>
    )
  }
}
