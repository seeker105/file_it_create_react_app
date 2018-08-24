import React from 'react';
import store from '../store/configureStore';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import {history} from '../App';
import {loadDashBoard} from '../actions/files';

export default class Header extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    history.push('/');
  }

  onDashboardNavigation = () => {
    loadDashBoard();
  }

  render () {
    return (
      <div>
        <h4>File It Header. Hello {store.getState().firstName}</h4><br />
        <Link to="/profile-page">Profile Page</Link><br />
        <p><button onClick={this.onDashboardNavigation}>Home</button></p>
        <button onClick={this.onLogoutClick}>Logout</button>
      </div>
    )
  }
}
