import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/LandingPage.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

registerServiceWorker();

ReactDOM.render(<App/>, document.getElementById('root'));
