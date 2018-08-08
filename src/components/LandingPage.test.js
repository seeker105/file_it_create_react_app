import React from 'react';
import LandingPage from './LandingPage';
import {BrowserRouter, Router, MemoryRouter} from 'react-router';
import {shallow, mount} from 'enzyme';
import {Link} from 'react-router-dom';
import {history} from '../App';


test("should display create account and sign in links", () => {
  const wrapper = shallow(<LandingPage />);
  // console.log(wrapper.find('#landing-page-link-to-create-account-form').html());
  wrapper.find('Link').at(0).simulate('click');
  // expect(history.location.pathname).toBe('/create-account');
})
