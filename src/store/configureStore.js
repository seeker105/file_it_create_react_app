import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return {};
    case 'STORE_USER_DATA':
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        accountType: action.accountType
      };
    case 'STORE_USER_NAME':
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName
      };
    case 'STORE_USER_CREDENTIAL':
      return {
        ...state,
        credential: action.credential
      };
    case 'UPDATE_EMAIL':
        return {
          ...state,
          email: action.email
        };
    case 'SET_FILES_DATA':
      return {
        ...state,
        filesData: action.filesData
      };
    case 'SET_ORDER_VALUES':
      return {
        ...state,
        newAccountType: action.newAccountType
      };
    case 'SET_ACCOUNT_TYPE':
      return {
        ...state,
        accountType: action.accountType
      }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(thunk));

export default store;
export const persistor = persistStore(store);
