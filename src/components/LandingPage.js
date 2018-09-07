import React from 'react';

export default class LandingPage extends React.Component {
  onCreateAccountClick = () => {
    this.props.history.push("/create-account")
  }

  onSignInWithEmailClick = () => {
    this.props.history.push("/sign-in-form");
  };

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
