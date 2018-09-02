import React from 'react';
import CreateAccountForm from '../components/CreateAccountForm';
import {MemoryRouter} from 'react-router';
import {mount, shallow} from 'enzyme';

test('should display page layout', () => {
  // const initialEntries = ["/create-account"];
  // const initialIndex = 0;
  // const wrapper = mount(
  //   <MemoryRouter
  //     initialIndex={initialIndex}
  //     initialEntries={initialEntries}>
  //       <CreateAccountForm/>
  //   </MemoryRouter>
  // );
  const wrapper = shallow(<CreateAccountForm/>)
  expect(wrapper.find('input').length).toBe(4)
});
