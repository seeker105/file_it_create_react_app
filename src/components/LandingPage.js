import React from 'react';
import {Link} from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/create-account" id="landing-page-link-to-create-account-form">Create Account</Link>
        <br />
        <Link to="/sign-in-form" id="landing-page-link-to-sign-in-form">Sign In</Link>
      </div>
    );
  }
}
export default LandingPage;
