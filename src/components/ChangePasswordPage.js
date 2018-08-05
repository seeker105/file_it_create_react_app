import React from 'react';
import Header from './Header';
import {firebase} from '../firebase/firebase';
import {history} from '../App';


export default class ChangePasswordPage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("change-password-form-new-password-field");
    const user = firebase.auth().currentUser;

    user.updatePassword(newPassword).then(() => {
      history.goBack();
    }).catch(() => {
      history.push('/sign-form');
    });

  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          <label>Enter new password</label>
          <input type="text" placeholder="New Password" id="change-password-form-new-password-field"/>
        </form>
      </div>
    )
  }
}
