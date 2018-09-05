import {loginGenerator, logoutGenerator} from '../actions/auth';

test('should generate a logout action', () => {
  const action = logoutGenerator();
  expect(action).toEqual({
    type: 'LOGOUT'
  })
})
