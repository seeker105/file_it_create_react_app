import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email
      };
    case 'STORE_USER_DATA':
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email
      };
    case 'LOGOUT':
      return {
        // ...state,
        // firstName: undefined,
        // lastName: undefined,
        // email: undefined
      };
    case 'STORE_USER_CREDENTIAL':
      return {
        ...state,
        credential: action.credential
      }
    case 'UPDATE_EMAIL':
        return {
          ...state,
          email: action.email
        }
    case 'SET_FILENAMES':
      return {
        ...state,
        fileNames: action.fileNames
      }
    default:
      return state;
  }
}

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(thunk));

export default store;
export const persistor = persistStore(store);
