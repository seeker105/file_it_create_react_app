import React from 'react';
import CreateAccountForm from './CreateAccountForm';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should display email label and text field', () => {
  const initialEntries = ["/change-email-page"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <CreateAccountForm/>
    </MemoryRouter>
  );
  expect(wrapper.find('input').length).toBe(4)
});
