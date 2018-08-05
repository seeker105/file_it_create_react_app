import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import {firebase} from '../firebase/firebase';
import {history} from '../App';
import store from '../store/configureStore';

export default class ChangeEmailPage extends React.Component {
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById('change-email-form-email-field');
    const user = firebase.auth().currentUser;

    if (this.validateEmail(email)) {
      user.updateEmail(email).then(() => {
        history.goBack();
      }).catch(() => {
        history.push('/sign-in-form');
      });
    } else {
      alert("Valid Email is required");
    }
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
