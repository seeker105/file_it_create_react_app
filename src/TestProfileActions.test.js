import {storeUserData} from './actions/profile';

test('should generate a storeUserData action', () => {
  const firstName = "Jeff";
  const lastName = "Kells";
  const email = "jk2@gmail.com";
  const action = storeUserData(firstName, lastName, email);
  expect(action).toEqual({
    type: 'STORE_USER_DATA',
    firstName: firstName,
    lastName: lastName,
    email: email
  })
})
