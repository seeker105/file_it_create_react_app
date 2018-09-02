import React from 'react';
import ChangeEmailPage from '../components/ChangeEmailPage';
import {MemoryRouter} from 'react-router';
import {mount, shallow} from 'enzyme';

test('should display page layout', () => {
  const initialEntries = ["/change-email-page"];
  const initialIndex = 0;
  // const wrapper = mount(
  //   <MemoryRouter
  //     initialIndex={initialIndex}
  //     initialEntries={initialEntries}>
  //       <ChangeEmailPage/>
  //   </MemoryRouter>
  // );
  const wrapper = shallow(<ChangeEmailPage/>)
  expect(wrapper.find('label').length).toBe(1)
  expect(wrapper.find('label').text()).toBe("Enter new Email")
  expect(wrapper.find('input').length).toBe(1)
});
