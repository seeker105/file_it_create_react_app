import React from 'react';
import {connect} from 'react-redux';
import {uploadFile, addFileNameToFilesData} from '../firebase/firebase';
import {setFilesData, startLoadFilesData} from '../actions/files';
import FileControl from './FileControl';
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
    };
    this.uploadId = '';
    this.uploadTask = null;
  }

  processOverwriteCheck = (file) => {
    const overwrite = window.confirm(file.name + ' already exists. Overwrite?');
    if (overwrite) {
      this.uploadTask = uploadFile(file); // without adding filename to list
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
    const input = document.getElementById('file-upload-page-file-input');
    const file = input.files[0];

    if (file) {
      const filesData = this.props.filesData;
      if (this.filenameIsFound(filesData, file.name)) {
        this.processOverwriteCheck(file);
      } else {
        this.uploadTask = uploadFile(file);
        this.uploadId = file.name;
        addFileNameToFilesData(file)
          .then((ref) => {
            console.log(ref.key);
            const newFileDataObj = {
              id: ref.key,
              filename: file.name
            };
            const newFilesData = this.state.filesData.concat([newFileDataObj]);
            console.log(newFilesData);
            this.props.setFilesData(newFilesData);
            this.setState({
              filesData: newFilesData,
              error: ''
            });
            input.value = '';
          });

        // this.props.startLoadFilesData().then(() => {
        //   history.push('/dashboard');
        // })

      }
    } else {
      this.setState({
        error: "Valid file entry is required"
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
              <p><input type="file" className="file-input-button" id="file-upload-page-file-input" /></p>
              <button className="button">Upload File</button>
            </form>
          </div>
        </div>
        <div className="content-container">
          {this.mainMessage && <p>{this.mainMessage}</p>}
          <div className="files-list">
            {this.state.filesData.map( (fileDataObj, x) => {
              if (this.uploadId && this.uploadId === fileDataObj.filename) {
                return <FileControl
                  fileDataObj={fileDataObj}
                  key={fileDataObj.id}
                  uploadTask={this.uploadTask}
                />
              } else {
                return <FileControl
                  fileDataObj={fileDataObj}
                  key={fileDataObj.id}
                />
              }
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