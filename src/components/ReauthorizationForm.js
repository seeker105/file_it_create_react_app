import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import {history} from '../index';

export default class ReauthorizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById('create_form_email_field').value;
    const password = document.getElementById('create_form_password_field').value;

    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    const user = firebase.auth().currentUser;
    user.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        history.goBack();
      })
      .catch((error) => {
        this.setState(() => ({error: error.message}));
      })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit} >
          {this.state.error && <p className="form-error">{this.state.error}</p>}
          <p>For security please sign in again to authorize the change.</p>
          <label>Email</label><br />
          <input type="text" placeholder="Email" id="create_form_email_field"/>
          <br />
          <label>Password</label><br />
          <input type="text" placeholder="Password" id="create_form_password_field"/>
          <button>Log In</button>
        </form>
        <Link to="/profile-page">Cancel</Link>
      </div>
    )
  }
}
