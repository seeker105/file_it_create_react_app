import React from 'react';
import EditProfilePage from './EditProfilePage';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should show page layout', () => {
  const initialEntries = ["/edit-profile-page"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <EditProfilePage/>
    </MemoryRouter>
  );
  expect(wrapper.find('label').length).toBe(2);
  expect(wrapper.find('label').at(0).text()).toBe('First Name');
  expect(wrapper.find('label').at(1).text()).toBe('Last Name');
  expect(wrapper.find('input').length).toBe(2);
});
