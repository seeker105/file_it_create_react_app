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
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Change Password</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <label className="label-style">Enter new password</label>
              <input type="text" placeholder="New Password" id="change-password-form-new-password-field" className="input-style"/>
            </div>
            <button className="button">Submit</button>
          </form>
          <Link to="/profile-page" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}
