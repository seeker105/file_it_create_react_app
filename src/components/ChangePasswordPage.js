import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import {firebase} from '../firebase/firebase';
import {history} from '../App';
import store from '../store/configureStore';
import {storeUserCredential} from '../actions/auth';

export default class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("change-password-form-new-password-field");
    const user = firebase.auth().currentUser;

    user.updatePassword(newPassword)
      .then(() => {
        history.goBack();
      })
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          let credential = store.getState().credential;
          user.reauthenticateAndRetrieveDataWithCredential(credential)
            .then((credential) => {
              store.dispatch(storeUserCredential(credential));
              user.updatePassword(newPassword).catch((error) => {
                this.setState(() => ({error: error.message}));
              })
            })
        } else {
          this.setState(() => ({error: error.message}));
        }
      });
  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p className="form-error">{this.state.error}</p>}
          <label>Enter new password</label>
          <input type="text" placeholder="New Password" id="change-password-form-new-password-field"/>
        </form>
        <Link to="/profile-page">Cancel</Link>
      </div>
    )
  }
}
