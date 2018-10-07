import React from 'react';
import {ChangeEmailPage} from '../components/ChangeEmailPage';
import {shallow} from 'enzyme';

test('should display page layout', () => {
  const wrapper = shallow(<ChangeEmailPage/>);
  expect(wrapper).toMatchSnapshot();
});
