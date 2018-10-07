import React from 'react';
import {SignInForm} from '../components/SignInForm';
import {shallow} from 'enzyme';

test('should display page layout', () => {
  const wrapper = shallow(<SignInForm/>);
  expect(wrapper).toMatchSnapshot();
});

test('should display error on password missing', (done) => {
  const wrapper = shallow(<SignInForm/>);
  wrapper.find('#sign_in_form_email_field').simulate('change', {
    target: {
      value: 'jk1@gmail.com'
    }
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  setTimeout(() => {
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    done();
  }, 500);
});

test('should display error on email missing', (done) => {
  const wrapper = shallow(<SignInForm/>);
  wrapper.find('#sign_in_form_password_field').simulate('change', {
    target: {
      value: 'Password'
    }
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  setTimeout(() => {
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    done();
  }, 500);
});