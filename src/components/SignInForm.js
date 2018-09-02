import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
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
        this.setState(() => ({error: error.message}))
      })
  };

  render () {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Sign In</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <label className="label-style">Email</label>
              <input type="text" placeholder="Email" id="create_form_email_field" className="input-style"/>
              <label className="label-style">Password</label>
              <input type="text" placeholder="Password" id="create_form_password_field" className="input-style"/>
            </div>
            <button className="button">Log In</button>
          </form>
          <Link to="/" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}
