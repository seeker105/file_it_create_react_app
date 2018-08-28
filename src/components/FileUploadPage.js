import React from 'react';
import firebase from '../firebase/firebase';
import {Link} from 'react-router-dom';
import Header from './Header';
import {loadDashBoard} from '../actions/files';
import store from '../store/configureStore';

export default class FileUploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    }
  }

  uploadFile = (file) => {
    const user = store.getState().credential.user;
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const filesRef = storageRef.child('files/' + user.uid + '/' + file.name);
    filesRef.put(file);
  }

  processOverwriteCheck = (file) => {
    const overwrite = window.confirm(file.name + ' already exists. Overwrite?');
    if (overwrite) {
      this.uploadFile(file); // without adding filename to list
      loadDashBoard();
    } else {
      // clear the file input and stay on FileUploadPage
      document.getElementById('file-upload-page-file-input').value = '';
    }
  }

  filenameIsFound = (filesData, filename) => {
    let found = false;
    for (let i = 0; i < filesData.length; i++) {
      if (filesData[i].filename === filename) {
        found = true;
      }
    }
    return found;
  }


  onSubmit = (e) => {
    e.preventDefault();
    const user = store.getState().credential.user;
    const file = document.getElementById('file-upload-page-file-input').files[0];
    console.log(file.name);
    const fileNames = store.getState().fileNames;
    if (this.filenameIsFound(fileNames, file.name)) {
      this.processOverwriteCheck(file);
    } else {
      this.uploadFile(file);
      // Add filename to fileNames list
      firebase.database().ref('users/' + user.uid + '/files').push(file.name);
      loadDashBoard();
    }
  }

  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">File Upload Form</h1>
          </div>
        </div>
        <div className="content-container">
          <form onSubmit={this.onSubmit}>
            {this.state.error && <p className="form-error">{this.state.error}</p>}
            <p><label>Choose File to upload</label></p>
            <p><input type="file" id="file-upload-page-file-input" /></p>
            <button className="button">Upload File</button>
          </form>
          <Link to="/dashboard" className="danger-button">Cancel</Link>
        </div>
      </div>
    )
  }
}
