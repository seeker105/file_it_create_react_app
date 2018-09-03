import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import {saveAs} from 'file-saver/FileSaver';
import {loadDashBoard, setFilesData} from '../actions/files';

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.filesData = props.filesData;
    if (!this.filesData || this.filesData.length === 0) {
      this.mainMessage = 'No files yet.'
    }
    this.user = props.user;
    this.storageRef = firebase.storage().ref();
  }

  onFileClick = (e, fileDataObj) => {
    e.preventDefault();

    const filename = fileDataObj.filename;
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
        alert("An error occurred in the download/n" + error.message)
      })
  };



  onDeleteClick = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const filename = e.target.name;
    if (window.confirm(filename + ' will be Deleted. This CANNOT be undone. Are you sure?')) {

      // first remove the file from storage
      const storagePromise = this.storageRef.child('files/' + this.user.uid + '/' + filename).delete()
      .catch((error) => {
        alert("There was a problem deleting the file: " + error.message);
      });

      // remove the fileDataObj from the list in the DB
      const fileListPromise = firebase.database().ref('users/' + this.user.uid + '/files/' + e.target.value).remove()
      .catch((error) => {
        alert("There was a problem removing the file reference: " + error.message);
      });

      // remove the fileDataObj from Redux store
      const newFilesData = this.filesData.filter(fileNameObj => fileNameObj.id !== e.target.value);
      console.log("newFilesData = ", newFilesData);
      this.props.setFilesData(newFilesData);

      // After the Promises finish, reload the page to display correct data
      Promise.all([storagePromise, fileListPromise])
      .then(loadDashBoard());
    }
  };

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
            {this.props.filesData.map( (fileDataObj, x) => {
              return (
                <div className="file-control" key={fileDataObj.id}>
                  <a href="/" onClick={(e) => this.onFileClick(e, fileDataObj)} className="file-link">
                    <div className="file">
                      <div className="file-icon">
                        <ion-icon name="document"></ion-icon>
                      </div>
                      <div className="file-name">
                        {fileDataObj.filename}
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    name={fileDataObj.filename}
                    onClick={this.onDeleteClick}
                    value={fileDataObj.id}
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

const mapStateToProps = (state) => {
  return {
    filesData: state.filesData,
    user: state.credential.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilesData: (newFilesData) => dispatch(setFilesData(newFilesData))
  }
}

// ConnectedDashBoardPage
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)