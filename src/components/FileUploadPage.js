import React from 'react';
import {Link} from 'react-router-dom';
import {uploadFile} from "../firebase/firebase";
import {loadDashBoard} from '../actions/files';
import {connect} from 'react-redux';

export class FileUploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    }
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
    const user = this.props.user;
    const file = document.getElementById('file-upload-page-file-input').files[0];

    if (file) {
      const filesData = this.props.filesData;
      if (this.filenameIsFound(filesData, file.name)) {
        this.processOverwriteCheck(file);
      } else {
        uploadFile(file);

        loadDashBoard();
      }
    } else {
      this.setState({
        error: "Valid file entry is required"
      })
    }
  }

  render () {
    return (
      <div>
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

const mapStateToProps = (state) => {
  return {
    user: state.credential.user,
    filesData: state.filesData
  }
}


// ConnectedFileUploadPage
export default connect(mapStateToProps)(FileUploadPage);