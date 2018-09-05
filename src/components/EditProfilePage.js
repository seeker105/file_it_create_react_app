import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {storeUserName} from '../actions/profile';
import {changeName} from "../firebase/firebase";

export class EditProfilePage extends React.Component {
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

    if (!firstName || !lastName) {
      this.setState(() => ({error: "First and last names are both required."}))
    } else {
      changeName(firstName, lastName)
        .then(() => {
          this.props.storeUserName(firstName,lastName);
          this.props.history.push('/profile-page');
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

  render () {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Name</h1>
          </div>
        </div>
        <div className="small-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-container">
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <label className="label-style">First Name</label>
              <input type="text" placeholder="First Name" id="edit-profile-form-first-name-field" defaultValue={this.props.firstName} className="input-style"/>
              <label className="label-style">Last Name</label>
              <input type="text" placeholder="Last Name" id="edit-profile-form-last-name-field" defaultValue={this.props.lastName} className="input-style"/>
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
    firstName: state.firstName,
    lastName: state.lastName
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUserName: (firstName, lastName) => dispatch(storeUserName(firstName, lastName))
  }
}

// ConnectedEditProfilePage
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
