import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import {firebase} from '../firebase/firebase';
import {history} from '../App';
import store from '../store/configureStore';
import {storeUserCredential} from '../actions/profile';

export default class ChangeEmailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('change-email-form-new-email-field');
    const user = firebase.auth().currentUser;

    user.updateEmail(email)
    .then(() => {
      history.goBack();
    })
    .catch((error) => {
      if (error.code === 'auth/requires-recent-login') {
        let credential = store.getState().credential;
        user.reauthenticateAndRetrieveDataWithCredential(credential)
          .then((credential) => {
            store.dispatch(storeUserCredential(credential));
            user.updateEmail(email).catch((error) => {
              this.setState(() => ({error: error.message}));
            })
          })
      } else {
        this.setState(() => ({error: error.message}));
      }
    });
  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p className="form-error">{this.state.error}</p>}
          <label>Enter new Email</label>
          <input type="text" placeholder="Email" id="change-email-form-new-email-field" defaultValue={store.getState().email}/>
          <button>Submit</button>
        </form>
        <Link to="/profile-page">Cancel</Link>
      </div>
    )
  }
}
