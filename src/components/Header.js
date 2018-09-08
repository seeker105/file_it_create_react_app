import React from 'react';
import {Link} from 'react-router-dom';
import {startLoadFilesData} from '../actions/files';
import {databaseSignOut} from "../firebase/firebase";
import {connect} from 'react-redux';
import {history} from "../App";

export class Header extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    databaseSignOut();
  };

  onDashboardNavigation = (e) => {
    e.preventDefault();
    this.props.startLoadFilesData().then(() => {
      history.push('/dashboard');
    })
  };

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
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoadFilesData: () => dispatch(startLoadFilesData())
  }
}

// ConnectedHeader
export default connect(mapStateToProps, mapDispatchToProps)(Header);
