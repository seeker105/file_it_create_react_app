import React from 'react';
import {Link} from 'react-router-dom';
import {signInWithEmailAndPassword} from '../firebase/firebase';
import {storeUserCredential} from '../actions/profile';
import {connect} from 'react-redux';

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: ''
    }
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();

    // const email = document.getElementById('create_form_email_field').value;
    // const password = document.getElementById('create_form_password_field').value;

    const email = this.state.email;
    const password = this.state.password;
    if (!password) {
      this.setState(() => ({error: 'Password is required'}))
    } else {
      signInWithEmailAndPassword(email, password)
        .then((credential) => {
          this.props.storeUserCredential(credential);
        })
        .catch((error) => {
          this.setState(() => ({error: error.message}))
        })
    }
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
              <input
                type="text"
                placeholder="Email"
                id="sign_in_form_email_field"
                className="input-style"
                onChange={this.onEmailChange}
                value={this.state.email}
              />
              <label className="label-style">Password</label>
              <input
                type="text"
                placeholder="Password"
                id="sign_in_form_password_field"
                className="input-style"
                onChange={this.onPasswordChange}
                value={this.state.password}
              />
            </div>
            <button className="button">Log In</button>
          </form>
          <Link to="/" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUserCredential: (credential) => dispatch(storeUserCredential(credential))
  }
}

// ConnectedSignInForm
export default connect(undefined, mapDispatchToProps)(SignInForm)