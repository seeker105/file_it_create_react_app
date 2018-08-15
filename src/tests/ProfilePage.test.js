import React from 'react';
import ProfilePage from '../components/ProfilePage';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should display page layout', () => {
  const initialEntries = ["/profile-page"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <ProfilePage/>
    </MemoryRouter>
  );
  expect(wrapper.find('label').length).toBe(2);
  expect(wrapper.find('label').at(0).text()).toBe("Name");
  expect(wrapper.find('label').at(1).text()).toBe("Email");
  expect(wrapper.find('a').length).toBe(6);
});
