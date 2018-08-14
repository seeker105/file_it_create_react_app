import React from 'react';
import LandingPage from '../components/LandingPage';
import {BrowserRouter, Router, MemoryRouter} from 'react-router';
import {shallow, mount} from 'enzyme';
import {render} from 'react-dom';
import {Link, Route} from 'react-router-dom';
import {history} from '../App';
import {Simulate} from 'react-dom/test-utils';

test('should display create account and sign in links', () => {
  const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
    <LandingPage />
  </MemoryRouter>);
  expect(wrapper.find('a').at(0).text()).toBe("Create Account");
  expect(wrapper.find('a').at(1).text()).toBe("Sign In");
})

// test('experimental tests', () => {
//   const leftClickEvent = {
//     defaultPrevented: false,
//     preventDefault() { this.defaultPrevented = true },
//     metaKey: null,
//     altKey: null,
//     ctrlKey: null,
//     shiftKey: null,
//     button: 0
//   }
//   const div = document.createElement('div');
//   const wrapper2 = render(
//     <MemoryRouter initialEntries={['/']} initialIndex={0}>
//       <LandingPage />
//     </MemoryRouter>, div
//   );

//   console.log(div.innerHTML);
//   Simulate.click(div.querySelector('#landing-page-link-to-create-account-form'), leftClickEvent);
//   console.log(div.innerHTML);
// })
