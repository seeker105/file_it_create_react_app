import React from 'react';
import {CreateAccountForm} from '../components/CreateAccountForm';
import {shallow} from 'enzyme';

test('should display page layout', () => {
  const wrapper = shallow(<CreateAccountForm/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error message with last name missing', () => {
  const wrapper = shallow(<CreateAccountForm/>);
  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find('input').length).toBe(4);
  wrapper.find('#create_form_first_name_field').simulate('change', {
    target: {
      value: 'Jeff'
    }
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('First and last name are required');
});

test('should render error message with first name missing', () => {
  const wrapper = shallow(<CreateAccountForm/>);
  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find('input').length).toBe(4);
  wrapper.find('#create_form_last_name_field').simulate('change', {
    target: {
      value: 'Kells'
    }
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('First and last name are required');
});

test('should render error message with email missing', (done) => {

  const wrapper = shallow(<CreateAccountForm/>);
  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find('input').length).toBe(4);
  wrapper.find('#create_form_first_name_field').simulate('change', {
    target: {
      value: 'Jeff'
    }
  });
  wrapper.find('#create_form_last_name_field').simulate('change', {
    target: {
      value: 'Kells'
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

test('should render error message with password missing', (done) => {

  const wrapper = shallow(<CreateAccountForm/>);
  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find('input').length).toBe(4);
  wrapper.find('#create_form_first_name_field').simulate('change', {
    target: {
      value: 'Jeff'
    }
  });
  wrapper.find('#create_form_last_name_field').simulate('change', {
    target: {
      value: 'Kells'
    }
  });
  wrapper.find('#create_form_email_field').simulate('change', {
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