import React from 'react';
import LandingPage from './LandingPage';
import {BrowserRouter, Router, MemoryRouter} from 'react-router';
import {shallow, mount} from 'enzyme';
import {render} from 'react-dom';
import {Link, Route} from 'react-router-dom';
import {history} from '../App';

test('should display create account and sign in links', () => {
  const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
    <LandingPage />
  </MemoryRouter>);
  console.log(wrapper.find('a').at(0).text());
  expect(wrapper.find('a').at(0).text()).toBe("Create Account");
  expect(wrapper.find('a').at(1).text()).toBe("Sign In");
})
