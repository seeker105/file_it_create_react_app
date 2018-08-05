import React from 'react';
import {firebase} from '../firebase/firebase';
import {Link} from 'react-router-dom';

export default class CreateAccountForm extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('create_form_email_field').value;
    const password = document.getElementById('create_form_password_field').value;
    const firstName = document.getElementById('create_form_first_name_field').value;
    const lastName = document.getElementById('create_form_last_name_field').value;
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);


    if (!firstName || !lastName) {
      alert("Name is required")
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.', errorMessage);
        } else {
          alert(errorMessage);
        }
      })
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit} >
          <input type="text" placeholder="First Name" id="create_form_first_name_field" />
          <input type="text" placeholder="Last Name" id="create_form_last_name_field" />
          <input type="text" placeholder="Email" id="create_form_email_field"/>
          <input type="text" placeholder="Password" id="create_form_password_field"/>
          <button>Register</button>
        </form>
        <Link to="/">Cancel</Link>
      </div>
    )
  }
}
