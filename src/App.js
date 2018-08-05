import React from 'react';
import createHistory from 'history/createBrowserHistory';
import {firebase} from './firebase/firebase';
import {Provider} from 'react-redux';
import store, {persistor} from './store/configureStore';
import AppRouter from './Routers/AppRouter';
import {loginGenerator, logoutGenerator} from './actions/auth';
import {PersistGate} from 'redux-persist/lib/integration/react';
import LoadingPage from './components/LoadingPage';

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
  history.location.pathname === '/create-account' ||
  history.location.pathname === '/sign-in-form') {
    history.push('/dashboard')
  }
  console.log(store.getState());
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let firstName, lastName;
    const email = user.email
    if (user.displayName) {
      const names = user.displayName.split(' ');
      firstName = names[0];
      lastName = names[names.length - 1];
      logIn(firstName, lastName, email)
    } else {
      firstName = localStorage.getItem('firstName');
      lastName = localStorage.getItem('lastName');
      user.updateProfile({
        displayName: firstName + ' ' + lastName
      }).then(logIn(firstName, lastName, email))
    }
  } else {
    store.dispatch(logoutGenerator());
    console.log(store.getState());
    history.push('/');
  }
})
