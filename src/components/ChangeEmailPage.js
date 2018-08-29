import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import firebase from '../firebase/firebase';
import {history} from '../App';
import store from '../store/configureStore';
import {updateEmail} from '../actions/profile';

export default class ChangeEmailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('change-email-form-new-email-field').value;
    const user = firebase.auth().currentUser;
    console.log(email);
    user.updateEmail(email)
      .then(() => {
        store.dispatch(updateEmail(email));
        history.goBack();
      })
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          history.push('/reauthorization-form')
        } else {
          this.setState(() => ({error: error.message}));
        }
      })
  }

  render () {
    return (
      <div>
        <Header />
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
              <input type="text" placeholder="Email" id="change-email-form-new-email-field" defaultValue={store.getState().email} className="input-style"/>
            </div>
            <button className="button">Submit</button>
          </form>
          <Link to="/profile-page" className="button">Cancel</Link>
        </div>
      </div>
    )
  }
}
