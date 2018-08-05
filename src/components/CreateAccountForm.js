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
    // let displayName;
    // if (firstName && lastName) {
    //   displayName = firstName + ' ' + lastName;
    // }
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);


    // let errorCode, errorMessage;
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
      // .then(() => {
      //   if (errorCode === undefined && errorMessage === undefined) {
      //     const user = firebase.auth().currentUser;
      //     if (displayName) {
      //       user.updateProfile({
      //         displayName
      //       }).catch(() => {
      //         alert('There was a problem saving your profile. Please got to the Profile Page and check your information.')
      //       })
      //     }
      //   }
      // });
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
