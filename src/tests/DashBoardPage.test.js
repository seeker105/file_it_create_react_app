import React from 'react';
import DashboardPage from '../components/DashboardPage';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should show page layout', () => {
  const initialEntries = ["/dashboard"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <DashboardPage/>
    </MemoryRouter>
  );
  expect(wrapper.find('h1').length).toBe(1)
  expect(wrapper.find('h1').text()).toBe("DashboardPage")
});
