import React from 'react';
import ChangePasswordPage from '../components/ChangePasswordPage';
import {MemoryRouter} from 'react-router';
import {mount, shallow} from 'enzyme';

test('should display page layout', () => {
  // const initialEntries = ["/change-password-page"];
  // const initialIndex = 0;
  // const wrapper = mount(
  //   <MemoryRouter
  //     initialIndex={initialIndex}
  //     initialEntries={initialEntries}>
  //       <ChangePasswordPage/>
  //   </MemoryRouter>
  // );
  const wrapper = shallow(<ChangePasswordPage/>)
  expect(wrapper).toMatchSnapshot();
});
