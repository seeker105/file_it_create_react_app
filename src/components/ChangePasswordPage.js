import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import firebase from '../firebase/firebase';
import {history} from '../App';

export default class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("change-password-form-new-password-field").value;
    const user = firebase.auth().currentUser;

    user.updatePassword(newPassword)
      .then(() => {
        history.goBack();
      })
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          history.push('/reauthorization-form')
        } else {
          this.setState(() => ({error: error.message}));
        }
      })
  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p className="form-error">{this.state.error}</p>}
          <label>Enter new password</label>
          <p><input type="text" placeholder="New Password" id="change-password-form-new-password-field"/></p>
          <p><button>Submit</button></p>
        </form>
        <Link to="/profile-page">Cancel</Link>
      </div>
    )
  }
}
