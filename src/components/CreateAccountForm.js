import React from 'react';
import {firebase} from '../firebase/firebase';
import {Link} from 'react-router-dom';
import {storeUserCredential} from '../actions/profile';
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
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);

    if (!firstName || !lastName) {
      this.setState(() => ({error: "Name is required"}))
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          store.dispatch(storeUserCredential(credential));
          firebase.database().ref('users/' + credential.user.uid).update({
            firstName,
            lastName,
            email
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
        <form onSubmit={this.onSubmit} >
          {this.state.error && <p className="form-error">{this.state.error}</p>}
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
