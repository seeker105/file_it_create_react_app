import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Link to="/create-account">Create Account</Link>
        <br />
        <Link to="/sign-in-form">Sign In</Link>
      </div>
    );
  }
}
export default LandingPage;
