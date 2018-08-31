import React from 'react';
import LandingPage from '../components/LandingPage';
import {BrowserRouter, Router, MemoryRouter} from 'react-router';
import {shallow, mount} from 'enzyme';
import {render} from 'react-dom';
import {Link, Route} from 'react-router-dom';
import {history} from '../App';
import {Simulate} from 'react-dom/test-utils';

test('should display create account and sign in links', () => {
  const wrapper = shallow(<LandingPage />);

  expect(wrapper).toMatchSnapshot();
})
