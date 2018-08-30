import React from 'react';
import {Link} from 'react-router-dom';
import store from '../store/configureStore';
import Header from './Header';

export default class ProfilePage extends React.Component {
  getAccountTypeString = () => {
    switch (store.getState().accountType) {
      case 0:
        return "Free";
      case 1:
        return "Personal";
      case 2:
        return "Business";
      default:
        return "Premium";
    }
  }

  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Profile Page</h1>
          </div>
        </div>
        <div className="small-content-container">
          <p><label>Name:</label> {store.getState().firstName} {store.getState().lastName}</p>
          <p><label>Email:</label> {store.getState().email}</p>
          <p><label>Account Type:</label> {this.getAccountTypeString()}</p>
          <Link to="/edit-profile-page" className="button">Change Name</Link><br />
          <Link to="/change-email-page" className="button">Change Email</Link><br />
          <Link to="/change-password-page" className="button">Change Password</Link><br />
          <Link to="/delete-account-page" className="danger-button">Delete Account</Link>
        </div>
      </div>
    )
  }
}
