import React from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import store from '../store/configureStore';
import {saveAs} from 'file-saver/FileSaver';
import {loadDashBoard, setFileNames} from '../actions/files';

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

  onFileClick = (e, fileNameObj) => {
    e.preventDefault();

    const filename = fileNameObj.filename;
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
    if (window.confirm(filename + ' will be Deleted. This CANNOT be undone. Are you sure?')) {
      // first remove the file from storage
      const storagePromise = this.storageRef.child('files/' + this.user.uid + '/' + filename).delete()
      .catch((error) => {
        alert("There was a problem deleting the file: " + error.message);
      })
      // remove the filename from the list in the DB
      const fileListPromise = firebase.database().ref('users/' + this.user.uid + '/files/' + e.target.value).remove()
      .catch((error) => {
        alert("There was a problem removing the file reference: " + error.message);
      })
      // remove the filename from Redux store
      const newFileNames = this.fileNames.filter(fileNameObj => fileNameObj.id !== e.target.value);
      console.log("newFileNames = ", newFileNames);
      store.dispatch(setFileNames(newFileNames));
      // After the Promises finish, reload the page to display correct data
      Promise.all([storagePromise, fileListPromise])
      .then(loadDashBoard());
    }
  }

  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Files List</h1>
            <div className="page-header__actions">
              <Link to="/file-upload-page" className="button">Upload Files</Link>
            </div>
          </div>
        </div>
        <div className="content-container">
          {this.mainMessage && <p>{this.mainMessage}</p>}
          <div className="files-list">
            {store.getState().fileNames.map( (filenameObj, x) => {
              return (
                <div className="file-control" key={filenameObj.id}>
                  <a href="/" onClick={(e) => this.onFileClick(e, filenameObj)} className="file-link">
                    <div className="file">
                      <div className="file-icon">
                        <ion-icon name="document"></ion-icon>
                      </div>
                      <div className="file-name">
                        {filenameObj.filename}
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    name={filenameObj.filename}
                    onClick={this.onDeleteClick}
                    value={filenameObj.id}
                    className="delete-button">
                    Delete File
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
