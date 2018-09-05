import React from 'react';
import {ProfilePage} from '../components/ProfilePage';
import {MemoryRouter} from 'react-router';
import {mount, shallow} from 'enzyme';

test('should display page layout', () => {
  // const initialEntries = ["/profile-page"];
  // const initialIndex = 0;
  // const wrapper = mount(
  //   <MemoryRouter
  //     initialIndex={initialIndex}
  //     initialEntries={initialEntries}>
  //       <ProfilePage/>
  //   </MemoryRouter>
  // );
  const wrapper = shallow(<ProfilePage/>)
  expect(wrapper).toMatchSnapshot();
});
