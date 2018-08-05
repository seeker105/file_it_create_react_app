import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import {firebase} from '../firebase/firebase';
import {history} from '../App';
import store from '../store/configureStore';

export default class ChangeEmailPage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById('change-email-form-email-field');
    const user = firebase.auth().currentUser;
    user.updateEmail(email).then(() => {
      history.goBack();
    }).catch(() => {
      history.push('/sign-form');
    });
  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          <label>Email</label>
          <input type="text" placeholder="Email" id="change-email-form-email-field" defaultValue={store.getState().email}/>
          <button>Submit</button>
        </form>
        <Link to="/profile-page">Cancel</Link>
      </div>
    )
  }
}
