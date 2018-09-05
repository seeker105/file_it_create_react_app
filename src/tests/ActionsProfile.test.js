import {storeUserData, storeUserName, storeUserCredential,
  updateEmail, setOrderValues, setAccountType} from '../actions/profile';

test('should generate a storeUserData action', () => {
  const firstName = "Jeff";
  const lastName = "Kells";
  const email = "jk2@gmail.com";
  const accountType = "0";
  const action = storeUserData(firstName, lastName, email, accountType);
  expect(action).toEqual({
    type: 'STORE_USER_DATA',
    firstName,
    lastName,
    email,
    accountType
  })
});


test('should generate a storeUserName action', () => {
  const firstName = "Jeff";
  const lastName = "Kells";
  const action = storeUserName(firstName, lastName);
  expect(action).toEqual({
    type: 'STORE_USER_NAME',
    firstName,
    lastName
  })
});



test('should generate a storeUserCredential action', () => {
  const credential = {
    email: "jk1@gmail.com",
    user: {
      uid: "1",
      displayName: "Jeff"
    }
  };

  const action = storeUserCredential(credential);
  expect(action).toEqual({
    type: 'STORE_USER_CREDENTIAL',
    credential
  })
});

test('should generate a updateEmail action', () => {
  const email = "jk2@gmail.com";
  const action = updateEmail(email);
  expect(action).toEqual({
    type: 'UPDATE_EMAIL',
    email
  })
});

test('should generate a setOrderValues action', () => {
  const newAccountType = "0";
  const action = setOrderValues(newAccountType);
  expect(action).toEqual({
    type: 'SET_ORDER_VALUES',
    newAccountType
  })
});


test('should generate a setAccountType action', () => {
  const accountType = "0";
  const action = setAccountType(accountType);
  expect(action).toEqual({
    type: 'SET_ACCOUNT_TYPE',
    accountType
  })
});



