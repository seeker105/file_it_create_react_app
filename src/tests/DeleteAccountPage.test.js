import React from 'react';
import DeleteAccountPage from '../components/DeleteAccountPage';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should show page layout', () => {
  const initialEntries = ["/delete-account-page"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <DeleteAccountPage/>
    </MemoryRouter>
  );
  expect(wrapper.find('button').length).toBe(2);
  expect(wrapper.find('Link').length).toBe(3);
});
