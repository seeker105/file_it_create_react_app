import React from 'react';
import '../css/LandingPage.css';
import {history} from '../App';

class LandingPage extends React.Component {
  onCreateAccountClick = () => {
    history.push("/create-account")
  }

  onSignInWithEmailClick = () => {
    history.push("/sign-in-form")
  }

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">File It!</h1>
          <p>Save your files in the cloud. Download from anywhere.</p>
          <button
            type="button"
            onClick={this.onCreateAccountClick}
            className="button">
            Create Account
          </button>
          <br />
          <button
            type="button"
            onClick={this.onSignInWithEmailClick}
            className="button">
            Sign In
          </button>
        </div>
      </div>
    );
  }
}
export default LandingPage;
