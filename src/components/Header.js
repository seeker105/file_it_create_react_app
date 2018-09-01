import React from 'react';
// import store from '../store/configureStore';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import {history} from '../App';
import {loadDashBoard} from '../actions/files';
import {connect} from 'react-redux';

export class Header extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    history.push('/');
  }

  onDashboardNavigation = (e) => {
    e.preventDefault();
    loadDashBoard();
  }

  render () {
    return (
      <div className="header">
        <div className="content-container">
          <div className="header__content">
            <a href="/" onClick={this.onDashboardNavigation} className="header__title">
              <h1>File It! </h1><br />
            </a>
            <div className="header__controls">
              <Link to="/profile-page" className="header__profile-icon">
                <ion-icon name="contact" size="large"></ion-icon>
              </Link>
              <Link to="/profile-page" className="header__profile-control">
                Hello, {this.props.firstName}
              </Link>
              <button onClick={this.onLogoutClick} className="header__logout-control">Logout</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// The purpose of the mapStateToProps function is to take the current result of
// store.getState() and pass some of it's data to the component as props. It 
// returns an object with key value pairs where the keys represent properties
// on the 'props' object
const mapStateToProps = (state) => {
  return {
    firstName: state.firstName
  };
}

// ConnectedHeader
export default connect(mapStateToProps)(Header);
