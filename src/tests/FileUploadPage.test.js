import React from 'react';
import FileUploadPage from '../components/FileUploadPage';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

test('should display page layout', () => {
  const initialEntries = ["/file-upload-page"];
  const initialIndex = 0;
  const wrapper = mount(
    <MemoryRouter
      initialIndex={initialIndex}
      initialEntries={initialEntries}>
        <FileUploadPage/>
    </MemoryRouter>
  );
  expect(wrapper.find('label').length).toBe(1)
  expect(wrapper.find('label').text()).toBe("Choose File to upload")
  expect(wrapper.find('input').length).toBe(1)
});
