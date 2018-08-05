import React from 'react';
import Header from './Header';
import store from '../store/configureStore';
import {Link} from 'react-router-dom';
import {firebase} from '../firebase/firebase';
import {history} from '../App';


class EditProfilePage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    const firstName = document.getElementById('edit-profile-form-first-name-field').value;
    const lastName = document.getElementById('edit-profile-form-last-name-field').value;
    const displayName = firstName + ' ' + lastName;

    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName
    }).then(() => {
      history.push('/dashboard');
    }).catch(() => {
      alert("Error. Data was not saved. Try again.")
    })

  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          <label>First Name</label>
          <input type="text" placeholder="First Name" id="edit-profile-form-email-field" defaultValue={store.getState().firstName} />
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" id="edit-profile-form-first-name-field" defaultValue={store.getState().lastName} />
          <button>Submit</button>
        </form>
        <Link to="/dashboard">Cancel</Link>
      </div>
    )
  }
}


export default EditProfilePage;
