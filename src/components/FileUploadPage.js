import React from 'react';
import firebase from '../firebase/firebase';
import {Link} from 'react-router-dom';
import Header from './Header';

export default class FileUploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    let contents = [];
    const user = firebase.auth().currentUser;

    const file = document.getElementById('file-upload-page-file-input').files[0];
    console.log(file.name);
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const filesRef = storageRef.child('files/' + user.uid + '/' + file.name);
    let uploadTask = filesRef.put(file);
    firebase.database().ref('users/' + user.uid + '/files').push(file.name);

  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p className="form-error">{this.state.error}</p>}
          <p><label>Choose File to upload</label></p>
          <p><input type="file" id="file-upload-page-file-input" /></p>
          <button>Submit</button>
        </form>
        <Link to="/dashboard">Cancel</Link>
      </div>
    )
  }
}
