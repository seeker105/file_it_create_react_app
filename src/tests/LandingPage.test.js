import React from 'react';
import LandingPage from '../components/LandingPage';
import {shallow} from 'enzyme';

test('should display create account and sign in links', () => {
  const wrapper = shallow(<LandingPage />);

  expect(wrapper).toMatchSnapshot();
})

test('should follow create account link', () => {
  const history = {
    push: jest.fn ()
  }

  const wrapper = shallow(<LandingPage history={history}/>);

  const link = wrapper.find('button').at(0);
  link.simulate('click');
  expect(history.push).toHaveBeenCalledWith('/create-account');

});

test('should follow sign in link', () => {
  const history = {
    push: jest.fn ()
  }

  const wrapper = shallow(<LandingPage history={history}/>);

  const link = wrapper.find('button').at(1);
  link.simulate('click');
  expect(history.push).toHaveBeenCalledWith('/sign-in-form');

});
