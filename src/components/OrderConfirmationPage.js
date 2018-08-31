import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';

export default class OrderConfirmationPage extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Thank you!</h1>
          </div>
        </div>
        <div className="medium-content-container-centered-text">
          <h1>Thank you for your order!</h1>
          <p>Happy Filing!</p>
          <p>Go to <Link to="/dashboard" className="button">All Files</Link></p>
        </div>

      </div>
    )
  }
}
