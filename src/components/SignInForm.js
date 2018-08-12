import React from 'react';
import {Link} from 'react-router-dom';
import {firebase} from '../firebase/firebase';
import store from '../store/configureStore';
import {storeUserCredential} from '../actions/profile';

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

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((credential) => {
        store.dispatch(storeUserCredential(credential));
      })
      .catch((error) => {
        this.setState(() => ({error: errorMessage}))
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
