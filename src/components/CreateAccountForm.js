import React from 'react';
import firebase from '../firebase/firebase';
import {Link} from 'react-router-dom';
import {storeUserData, storeUserCredential} from '../actions/profile';
import store from '../store/configureStore';

export default class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('create_form_email_field').value;
    const password = document.getElementById('create_form_password_field').value;
    const firstName = document.getElementById('create_form_first_name_field').value;
    const lastName = document.getElementById('create_form_last_name_field').value;
    const accountType = "0";
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('accountType', accountType);

    if (!firstName || !lastName) {
      this.setState(() => ({error: "Name is required"}))
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          credential.user.updateProfile({
            displayName: firstName
          })
          store.dispatch(storeUserData(firstName, lastName, email, accountType));
          store.dispatch(storeUserCredential(credential));
          firebase.database().ref('users/' + credential.user.uid).set({
            lastName,
            accountType
          });
        })
        .catch((error) => {
          this.setState(() => ({error: error.message}))
        })
    }
  }

  render () {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Create Account</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <label className="label-style">First Name</label>
              <input type="text" placeholder="First Name" id="create_form_first_name_field" className="input-style"/>
              <label className="label-style">Last Name</label>
              <input type="text" placeholder="Last Name" id="create_form_last_name_field" className="input-style"/>
              <label className="label-style">Email</label>
              <input type="text" placeholder="Email" id="create_form_email_field" className="input-style"/>
              <label className="label-style">Password</label>
              <input type="text" placeholder="Password" id="create_form_password_field" className="input-style"/>
            </div>
            <button className="button button-register">Register</button>
          </form>
          <Link to="/" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}
