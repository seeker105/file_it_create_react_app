import React from 'react';
import {Link} from 'react-router-dom';
import {reauthenticate} from "../firebase/firebase";

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

    // const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    // const user = firebase.auth().currentUser;
    // user.reauthenticateAndRetrieveDataWithCredential(credential)
    reauthenticate(email, password)
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        this.setState(() => ({error: error.message}));
      })
  }

  render () {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Re-authorize Account</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <p>For security please sign in again to authorize the change.</p>
              <label className="label-style">Email</label>
              <input type="text" placeholder="Email" id="create_form_email_field" className="input-style"/>
              <label className="label-style">Password</label>
              <input type="text" placeholder="Password" id="create_form_password_field" className="input-style"/>
            </div>
            <button className="button">Log In</button>
          </form>
          <Link to="/profile-page" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}
