import React from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom';

export default class DashboardPage extends React.Component {


  render () {
    return (
      <div>
        <Header />
        <h1>DashboardPage</h1>
        <Link to="/file-upload-page">Upload Files</Link>
      </div>
    )
  }
}
