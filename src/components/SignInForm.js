import React from 'react';
import {Link} from 'react-router-dom';
import {firebase} from '../firebase/firebase';

export default class SignInForm extends React.Component {
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

    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        this.setState(() => ({error: "Wrong password."}))
        // alert('Wrong password.');
      } else {
        this.setState(() => ({error: errorMessage}))
        // alert(errorMessage);
      }
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit} >
          {this.state.error && <p className="form-error">{this.state.error}</p>}
          <input type="text" placeholder="Email" id="create_form_email_field"/>
          <br />
          <input type="text" placeholder="Password" id="create_form_password_field"/>
          <button>Log In</button>
        </form>
        <Link to="/">Cancel</Link>
      </div>
    )
  }
}
