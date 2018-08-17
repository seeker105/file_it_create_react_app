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

    const fileList = document.getElementById('file-upload-page-file-input').files;
    console.log(fileList);

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();
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
