import React from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import store from '../store/configureStore';
import {saveAs} from 'file-saver/FileSaver';
import {loadDashBoard} from '../actions/files';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.fileNames = store.getState().fileNames;
    if (this.fileNames && this.fileNames.length === 0) {
      this.mainMessage = 'No files yet.'
    }
    this.user = store.getState().credential.user
    this.storageRef = firebase.storage().ref();
  }

  onFileClick = (e) => {
    e.preventDefault();

    const filename = e.target.text;
    this.storageRef.child('files/' + this.user.uid + '/' + filename).getDownloadURL()
      .then( (url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          const blob = xhr.response;
          saveAs(blob, filename)
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch( (error) => {
        alert("An error occured in the download/n" + error.message)
      })
  }

  onDeleteClick = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const filename = e.target.name;
    // first remove the file from storage
    // const storagePromise = this.storageRef.child('files/' + this.user.uid + '/' + filename).delete()
    //   .catch((error) => {
    //     alert("There was a problem deleting the file: " + error.message);
    //   })
    // remove the filename from the list in the DB
    // const fileListPromise = firebase.database().ref('users/' + this.user.uid + '/files/' + e.target.value).remove()
    //   .catch((error) => {
    //     alert("There was a problem removing the file reference: " + error.message);
    //   })

  }

  render () {
    return (
      <div>
        <Header />
        <h1>DashboardPage</h1>
        <Link to="/file-upload-page">Upload Files</Link>
        {this.mainMessage && <p>{this.mainMessage}</p>}
        <ul>
          {store.getState().fileNames.map( (filenameObj, x) => {
            return <li key={filenameObj.id}>
              <a href="javascript:;" onClick={this.onFileClick}>{filenameObj.filename}</a>
              <button
                type="button"
                name={filenameObj.filename}
                onClick={this.onDeleteClick}
                value={filenameObj.id}
                >Delete File
              </button>
            </li>
          })}
        </ul>
      </div>
    )
  }
}
