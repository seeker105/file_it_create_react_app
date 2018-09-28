import React from 'react';
import {connect} from 'react-redux';
import {getDownloadURL, deleteFile, removeFileData} from '../firebase/firebase';
import {saveAs} from 'file-saver/FileSaver';
import {setFilesData, startLoadFilesData} from '../actions/files';
import {history} from "../App";

export class FileControl extends React.Component {
  constructor(props) {
    super(props);
    this.filesData = props.filesData;

    this.filename = props.fileDataObj.filename;
    this.fileId = props.fileDataObj.id;
  }

  onDeleteClick = (e) => {
    // const filename = e.target.name;
    // const fileId = e.target.value;
    if (window.confirm(this.filename + ' will be Deleted. This CANNOT be undone. Are you sure?')) {

      // first remove the file from storage
      const storagePromise = deleteFile(this.filename)
        .catch((error) => {
          alert("There was a problem deleting the file: " + error.message);
        });

      // remove the fileDataObj from the list in the DB
      const fileListPromise = removeFileData(this.fileId)
        .catch((error) => {
          alert("There was a problem removing the file reference: " + error.message);
        });

      // remove the fileDataObj from Redux store
      const newFilesData = this.filesData.filter(fileNameObj => fileNameObj.id !== this.fileId);
      this.props.setFilesData(newFilesData);

      // After the Promises finish, reload the page to display correct data
      Promise.all([storagePromise, fileListPromise])
        .then(() => {
          this.props.startLoadFilesData().then(() => {
            history.push('/dashboard');
          })
        })
    }
  };

  onFileClick = (e, fileDataObj) => {
    e.preventDefault();

    const filename = fileDataObj.filename;
    getDownloadURL(filename)
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

  render () {
    return (
      <div className="file-control" >
        <a href="/" onClick={(e) => this.onFileClick(e, this.props.fileDataObj)} className="file-link">
          <div className="file">
            <div className="file-icon">
              <ion-icon name="document" />
            </div>
            <div className="file-name">
              {this.filename}
            </div>
          </div>
        </a>
        <button
          type="button"
          name={this.filename}
          onClick={this.onDeleteClick}
          value={this.fileId}
          className="delete-button">
          Delete File
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filesData: state.filesData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilesData: (newFilesData) => dispatch(setFilesData(newFilesData)),
    startLoadFilesData: () => dispatch(startLoadFilesData())
  }
};

// ConnectedFileControl
export default connect(mapStateToProps, mapDispatchToProps)(FileControl)