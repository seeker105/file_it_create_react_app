import React from 'react';
import createHistory from 'history/createBrowserHistory';
import firebase from './firebase/firebase';
import {Provider} from 'react-redux';
import store, {persistor} from './store/configureStore';
import AppRouter from './Routers/AppRouter';
import {loginGenerator, logoutGenerator} from './actions/auth';
import {PersistGate} from 'redux-persist/lib/integration/react';
import LoadingPage from './components/LoadingPage';
import {loadDashBoard} from './actions/files';

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

export default App;

const logIn = (firstName, lastName, email) => {
  store.dispatch(loginGenerator(firstName, lastName, email));
  if (history.location.pathname === '/' ||
      history.location.pathname === '/dashboard' ||
      history.location.pathname === '/create-account' ||
      history.location.pathname === '/sign-in-form') {
    console.log("hits loadDashBoard");
    loadDashBoard();
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
    localStorage.removeItem('lastName');
    localStorage.removeItem('firstName');
    store.dispatch(logoutGenerator());
    console.log(store.getState());
    history.push('/');
  }
})
