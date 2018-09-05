import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {storeNewEmail} from "../firebase/firebase";
import {updateEmail} from '../actions/profile';

export class ChangeEmailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('change-email-form-new-email-field').value;
    console.log(email);
    storeNewEmail(email)
      .then(() => {
        this.props.updateEmail(email);
        this.props.history.goBack();
      })
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          this.props.history.push('/reauthorization-form')
        } else {
          this.setState(() => ({error: error.message}));
        }
      })
  }

  render () {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Change Email</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <label className="label-style">Enter new Email</label>
              <input type="text" placeholder="Email" id="change-email-form-new-email-field" defaultValue={this.props.email} className="input-style"/>
            </div>
            <button className="button">Submit</button>
          </form>
          <Link to="/profile-page" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmail: (email) => dispatch(updateEmail(email))
  }
}

// ConnectedChangeEmailPage
export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailPage);
