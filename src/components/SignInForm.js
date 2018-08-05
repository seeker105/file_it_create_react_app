import React from 'react';
import {Link} from 'react-router-dom';
import {firebase} from '../firebase/firebase';

export default class SignInForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById('create_form_email_field').value;
    const password = document.getElementById('create_form_password_field').value;

    let errorCode, errorMessage;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      errorCode = error.code;
      errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit} >
          <input type="text" placeholder="Email" id="create_form_email_field"/>
          <br />
          <input type="text" placeholder="Password" id="create_form_password_field"/>
          <button>Log In</button>
        </form>
        <Link to="/profile-page">Cancel</Link>
      </div>
    )
  }
}
