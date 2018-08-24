import React from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
// import firebase from '../firebase/firebase';
import store from '../store/configureStore';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.fileNames = store.getState().fileNames;
    if (this.fileNames && this.fileNames.length === 0) {
      this.mainMessage = 'No files yet.'
    }
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
            return <li key={x}>{name}</li>
          })}
        </ul>
      </div>
    )
  }
}
