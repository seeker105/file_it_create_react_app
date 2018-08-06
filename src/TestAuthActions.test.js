import {loginGenerator, logoutGenerator} from './actions/auth';

test('should generate a login action', () => {
  const firstName = "Jeff";
  const lastName = "Kells";
  const email = "jk1@gmail.com";
  const action = loginGenerator(firstName, lastName, email);
  expect(action).toEqual({
    type: 'LOGIN',
    firstName: firstName,
    lastName: lastName,
    email: email
  })
})

test('should generate a logout action', () => {
  const action = logoutGenerator();
  expect(action).toEqual({
    type: 'LOGOUT'
  })
})
