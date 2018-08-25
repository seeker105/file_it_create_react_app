import React from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import store from '../store/configureStore';
import {saveAs} from 'file-saver/FileSaver';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.fileNames = store.getState().fileNames;
    if (this.fileNames && this.fileNames.length === 0) {
      this.mainMessage = 'No files yet.'
    }
  }

  onFileClick = (e) => {
    e.preventDefault();

    console.log(e.target.text);
    const user = store.getState().credential.user
    const filename = e.target.text;
    const storage = firebase.storage();
    const storageRef = storage.ref();
    storageRef.child('files/' + user.uid + '/' + filename).getDownloadURL()
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

  render () {
    return (
      <div>
        <Header />
        <h1>DashboardPage</h1>
        <Link to="/file-upload-page">Upload Files</Link>
        {this.mainMessage && <p>{this.mainMessage}</p>}
        <ul>
          {store.getState().fileNames.map( (name, x) => {
            return <li key={x}>
              <a href="javascript:;" onClick={this.onFileClick}>{name}</a>
            </li>
          })}
        </ul>
      </div>
    )
  }
}
