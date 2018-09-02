import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import {getPlanDetails} from '../utilities/planData';
import {connect} from 'react-redux';

export class ProfilePage extends React.Component {
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
          <p><label>Name:</label> {this.props.firstName} {this.props.lastName}</p>
          <p><label>Email:</label> {this.props.email}</p>
          <p><label>Account Type:</label> {getPlanDetails(this.props.accountType)}</p>
          <Link to="/edit-profile-page" className="button">Change Name</Link><br />
          <Link to="/change-email-page" className="button">Change Email</Link><br />
          <Link to="/change-password-page" className="button">Change Password</Link><br />
          <Link to="/select-account-type" className="button">Change Account Tier</Link><br />
          <Link to="/delete-account-page" className="danger-button">Delete Account</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    accountType: state.accountType
  }
}

// ConnectedProfilePage
export default connect(mapStateToProps)(ProfilePage);
