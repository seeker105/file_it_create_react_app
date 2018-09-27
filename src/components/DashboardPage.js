import React from 'react';
import {connect} from 'react-redux';
import {getDownloadURL, deleteFile, removeFileData, uploadFile,
        addFileNameToFilesData} from '../firebase/firebase';
import {saveAs} from 'file-saver/FileSaver';
import {setFilesData, startLoadFilesData} from '../actions/files';
import {history} from "../App";

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.filesData = props.filesData;
    if (!this.filesData || this.filesData.length === 0) {
      this.mainMessage = 'No files yet.'
    }
    this.user = props.user;
    this.state = {
      error: "",
      filesData: props.filesData
    }
  }

  processOverwriteCheck = (file) => {
    const overwrite = window.confirm(file.name + ' already exists. Overwrite?');
    if (overwrite) {
      uploadFile(file); // without adding filename to list
      this.props.startLoadFilesData().then(() => {
        history.push('/dashboard');
      })
    } else {
      // clear the file input and stay on FileUploadPage
      document.getElementById('file-upload-page-file-input').value = '';
    }
  };

  filenameIsFound = (filesData, filename) => {
    let found = false;
    for (let i = 0; i < filesData.length; i++) {
      if (filesData[i].filename === filename) {
        found = true;
      }
    }
    return found;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const file = document.getElementById('file-upload-page-file-input').files[0];

    if (file) {
      const filesData = this.state.filesData;
      if (this.filenameIsFound(filesData, file.name)) {
        this.processOverwriteCheck(file);
      } else {
        uploadFile(file);
        addFileNameToFilesData(file)
          .then((ref) => {
            const newDataObj = {
              id: ref.key,
              filename: file.name
            };
            const newFilesData = this.state.filesData.concat([newDataObj]);
            // Add the filename to the state to update display
            this.setState({
              filesData: newFilesData
            });
            // Add the filename to the Redux store
            this.props.setFilesData(newFilesData);
          });
      }
    } else {
      this.setState({
        error: "Valid file entry is required"
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
        xhr.onload = function() {
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
    const filename = e.target.name;
    const fileId = e.target.value;
    if (window.confirm(filename + ' will be Deleted. This CANNOT be undone. Are you sure?')) {

      // first remove the file from storage
      const storagePromise = deleteFile(filename)
      .catch((error) => {
        alert("There was a problem deleting the file: " + error.message);
      });

      // remove the fileDataObj from the list in the DB
      const fileListPromise = removeFileData(fileId)
      .catch((error) => {
        alert("There was a problem removing the file reference: " + error.message);
      });

      // remove the fileDataObj from Redux store
      const newFilesData = this.filesData.filter(fileNameObj => fileNameObj.id !== e.target.value);
      this.props.setFilesData(newFilesData);

      // After the Promises finish, change the state to display correct data
      Promise.all([storagePromise, fileListPromise])
        .then(() => {
          this.setState({
            filesData: newFilesData
          })
        })
    }
  };

  render () {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">All Files List</h1>
            <form onSubmit={this.onSubmit}>
              {this.state.error && <p className="form-error">{this.state.error}</p>}
              <p><label>Choose File to upload</label></p>
              <p><input type="file" id="file-upload-page-file-input" /></p>
              <button className="button">Upload File</button>
            </form>
          </div>
        </div>
        <div className="content-container">
          {this.mainMessage && <p>{this.mainMessage}</p>}
          <div className="files-list">
            {this.state.filesData.map( (fileDataObj) => {
              return (
                <div className="file-control" key={fileDataObj.id}>
                  <a href="/" onClick={(e) => this.onFileClick(e, fileDataObj)} className="file-link">
                    <div className="file">
                      <div className="file-icon">
                        <ion-icon name="document" />
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
    setFilesData: (newFilesData) => dispatch(setFilesData(newFilesData)),
    startLoadFilesData: () => dispatch(startLoadFilesData())
  }
};

// ConnectedDashBoardPage
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)