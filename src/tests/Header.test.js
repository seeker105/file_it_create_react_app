import React from 'react';
import {Header} from '../components/Header';
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';
import {mount, shallow} from 'enzyme';
import store from '../store/configureStore';
import {storeUserData} from '../actions/profile';

test('should show page layout', () => {
  const firstName = 'Jeff';
  const lastName = 'Kells';
  const email = 'jk2@gmail.com'
  store.dispatch(storeUserData(firstName, lastName, email));
  const initialEntries = ["/"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <Header/>
    </MemoryRouter>
  );
  expect(wrapper.find('button').length).toBe(1)
});
