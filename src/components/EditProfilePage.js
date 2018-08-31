import React from 'react';
import Header from './Header';
import store from '../store/configureStore';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import {history} from '../App';
import {storeUserData} from '../actions/profile';

export default class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const firstName = document.getElementById('edit-profile-form-first-name-field').value;
    const lastName = document.getElementById('edit-profile-form-last-name-field').value;
    const user = firebase.auth().currentUser;

    if (!firstName || !lastName) {
      this.setState(() => ({error: "First and last names are both required."}))
    } else {
      // user.updateProfile({
      //   displayName: firstName
      // }).catch()

      user.updateProfile({
        displayName: firstName
      })
        .then(() => {
          firebase.database().ref('users/' + user.uid + '/lastName').set(lastName);
          store.dispatch(storeUserData(firstName, lastName, user.email));
          history.push('/profile-page');
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Name</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <label className="label-style">First Name</label>
              <input type="text" placeholder="First Name" id="edit-profile-form-first-name-field" defaultValue={store.getState().firstName} className="input-style"/>
              <label className="label-style">Last Name</label>
              <input type="text" placeholder="Last Name" id="edit-profile-form-last-name-field" defaultValue={store.getState().lastName} className="input-style"/>
            </div>
            <button className="button">Submit</button>
          </form>
          <Link to="/profile-page" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}
