import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './css/index.css';
import './css/LandingPage.css';
import './css/Header.css';
import './css/pageHeader.css';
import './css/DashboardPage.css';
import './css/DeleteAccountPage.css';
import './css/AccountSelectionPage.css';
import './css/CheckoutPage.css';

registerServiceWorker();

ReactDOM.render(<App/>, document.getElementById('root'));
