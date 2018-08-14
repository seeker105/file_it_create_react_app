import React from 'react';
import Header from './Header';
import store from '../store/configureStore';
import {Link} from 'react-router-dom';
import {firebase} from '../firebase/firebase';
import {history} from '../App';
import {storeUserData} from '../actions/profile';


class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const firstName = document.getElementById('edit-profile-form-first-name-field').value;
    const lastName = document.getElementById('edit-profile-form-last-name-field').value;
    const user = firebase.auth().currentUser;

    if (!firstName || !lastName) {
        this.setState(() => ({error: "First and last names are both required."}))
    } else {
      user.updateProfile({
        displayName: firstName + ' ' + lastName
      })
        .then(() => {
          store.dispatch(storeUserData(firstName, lastName, user.email));
          history.push('/profile-page');
        })
        .catch(() => {
          alert("Error. Data was not saved. Try again.")
        })
    }
  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p className="form-error">{this.state.error}</p>}
          <label>First Name</label>
          <input type="text" placeholder="First Name" id="edit-profile-form-first-name-field" defaultValue={store.getState().firstName} />
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" id="edit-profile-form-last-name-field" defaultValue={store.getState().lastName} />
          <button>Submit</button>
        </form>
        <Link to="/profile-page">Cancel</Link>
      </div>
    )
  }
}


export default EditProfilePage;
