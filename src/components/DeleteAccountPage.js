import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import firebase from '../firebase/firebase';
import {logoutGenerator} from '../actions/auth';
import {connect} from 'react-redux';

export class DeleteAccountPage extends React.Component {

  onDeleteSelected = (e) => {
    console.log('button clicked');

    const user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid).remove()
      .then(() => {
        this.props.logout();
        return user.delete();
      })
      .catch(() => {
        alert("There was a problem closing your account.")
      })
  }

  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Delete Account. DANGER!</h1>
          </div>
        </div>
        <div className="content-container">
          <p>Are you sure you wish to delete your account? This CANNOT be undone. All files saved in your account will be permanently lost if you close your account. Be sure you have downloaded ALL content you might want to save before closing your account!</p>
          <div>
            <button onClick={this.onDeleteSelected} className="delete-account-button">Delete Account</button><br />
            <Link to="/profile-page" className="button escape-delete-button">Get me out of here!</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutGenerator())
  }
}

// ConnectedDeleteAccountPage
export default connect(undefined, mapDispatchToProps)(DeleteAccountPage)