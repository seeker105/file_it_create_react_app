import React from 'react';
import ReauthorizationForm from '../components/ReauthorizationForm';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should display page layout', () => {
  const initialEntries = ["/sign-in-form"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <ReauthorizationForm/>
    </MemoryRouter>
  );
  expect(wrapper.find('input').length).toBe(2);
  expect(wrapper.find('label').length).toBe(2);
  expect(wrapper.find('label').at(0).text()).toBe('Email');
  expect(wrapper.find('label').at(1).text()).toBe('Password');

});
