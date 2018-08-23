import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
// import App from './App';

import createHistory from 'history/createBrowserHistory';
import firebase from './firebase/firebase';
import {Provider} from 'react-redux';
import store, {persistor} from './store/configureStore';
import AppRouter from './Routers/AppRouter';
import {loginGenerator, logoutGenerator} from './actions/auth';
import {PersistGate} from 'redux-persist/lib/integration/react';
import LoadingPage from './components/LoadingPage';

registerServiceWorker();

export const history = createHistory();

const App = () => (
  <div>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <AppRouter history={history} />
      </PersistGate>
    </Provider>
  </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));

const logIn = (firstName, lastName, email) => {
  store.dispatch(loginGenerator(firstName, lastName, email));
  if (history.location.pathname === '/' ||
      history.location.pathname === '/create-account' ||
      history.location.pathname === '/sign-in-form') {
    history.push('/dashboard')
  }
  console.log("logged in: ", store.getState());
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let firstName, lastName;
    const email = user.email;
    if (user.displayName) {
      firstName = user.displayName;
    } else {
      firstName = localStorage.getItem('firstName');
      user.updateProfile({
        displayName: firstName
      })
    }

    lastName = localStorage.getItem('lastName')
    if (!lastName) {
      firebase.database().ref('users/' + user.uid +'/lastName')
        .once('value')
        .then((snapshot) => {
          lastName = snapshot.val();
          logIn(firstName, lastName, email);
        });
    } else {
      logIn(firstName, lastName, email);
    }
  } else {
    store.dispatch(logoutGenerator());
    console.log(store.getState());
    history.push('/');
  }
})
