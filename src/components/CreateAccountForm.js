import React from 'react';
import {createUserWithEmailAndPassword, storeLastNameAccountType} from '../firebase/firebase';
import {Link} from 'react-router-dom';
import {storeUserData, storeUserCredential} from '../actions/profile';
import {connect} from 'react-redux';

export class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  onFirstNameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      firstName: e.target.value
    })
  };

  onLastNameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      lastName: e.target.value
    })
  };

  onEmailChange = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    })
  };

  onPasswordChange = (e) => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    // const firstName = document.getElementById('create_form_first_name_field').value;
    // const email = document.getElementById('create_form_email_field').value;
    // const password = document.getElementById('create_form_password_field').value;
    // const lastName = document.getElementById('create_form_last_name_field').value;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;
    const accountType = "0";
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('accountType', accountType);

    if (!firstName || !lastName) {
      this.setState(() => ({error: "First and last name are required"}))
    } else {
      createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          credential.user.updateProfile({
            displayName: firstName
          });
          this.props.storeUserData(firstName, lastName, email, accountType);
          this.props.storeUserCredential(credential);
          storeLastNameAccountType(credential.user, lastName, accountType);
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
            <h1 className="page-header__title">Create Account</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <label className="label-style">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                id="create_form_first_name_field"
                className="input-style"
                onChange={this.onFirstNameChange}
                value={this.state.firstName}
              />
              <label className="label-style">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                id="create_form_last_name_field"
                className="input-style"
                onChange={this.onLastNameChange}
                value={this.state.lastName}
              />
              <label className="label-style">Email</label>
              <input
                type="text"
                placeholder="Email"
                id="create_form_email_field"
                className="input-style"
                onChange={this.onEmailChange}
                value={this.state.email}
              />
              <label className="label-style">Password</label>
              <input
                type="text"
                placeholder="Password"
                id="create_form_password_field"
                className="input-style"
                onChange={this.onPasswordChange}
                value={this.state.password}
              />
            </div>
            <button className="button button-register">Register</button>
          </form>
          <Link to="/" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUserData: (firstName, lastName, email, accountType) => dispatch(storeUserData(firstName, lastName, email, accountType)),
    storeUserCredential: (credential) => dispatch(storeUserCredential(credential))
  }
};

// ConnectedCreateAccountForm
export default connect(undefined, mapDispatchToProps)(CreateAccountForm)