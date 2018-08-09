import React from 'react';
import ChangeEmailPage from './ChangeEmailPage';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should display email label and text field', () => {
  const initialEntries = ["/change-email-page"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <ChangeEmailPage/>
    </MemoryRouter>
  );
  expect(wrapper.find('label').length).toBe(1)
  expect(wrapper.find('label').text()).toBe("Email")
  expect(wrapper.find('input').length).toBe(1)
});
