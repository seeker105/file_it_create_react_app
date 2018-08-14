import React from 'react';
import SignInForm from '../components/SignInForm';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should display page layout', () => {
  const initialEntries = ["/sign-in-form"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <SignInForm/>
    </MemoryRouter>
  );
  expect(wrapper.find('input').length).toBe(2);
});
