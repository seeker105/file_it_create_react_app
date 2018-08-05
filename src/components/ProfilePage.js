import React from 'react';
import {Link} from 'react-router-dom';
import store from '../store/configureStore';
import Header from './Header';

export default class ProfilePage extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <p><label>Name</label> {store.getState().firstName} {store.getState().lastName}</p>
        <p><label>Email</label> {store.getState().email}</p>
        <Link to="/edit-profile-page">Edit</Link><br />
        <Link to="/change-email-page">Change email</Link><br />
        <Link to="/change-password-page">Change password</Link>
      </div>
    )
  }
}
