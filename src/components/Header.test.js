import React from 'react';
import Header from './Header';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';
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
  expect(wrapper.find('h4').length).toBe(1)
  expect(wrapper.find('h4').text()).toBe(`File It Header. Hello ${firstName}`)
  expect(wrapper.find('a').length).toBe(2)
  expect(wrapper.find('a').at(0).text()).toBe('Profile Page')
  expect(wrapper.find('a').at(1).text()).toBe('Home')
});
