import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import BlogForm from './BlogForm';

test('blog form calls the event handler with the right details', () => {
  const mockHandler = jest.fn();
  const component = render(<BlogForm createBlog={mockHandler} />);

  const form = component.container.querySelector('#form');
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');

  fireEvent.change(title, {
    target: { value: 'this is the title of the new blog' },
  });

  fireEvent.change(author, {
    target: { value: 'Jorge Medias' },
  });

  fireEvent.change(url, {
    target: {
      value:
        'https://fullstackopen.com/en/part5/testing_react_apps#clicking-buttons-in-tests',
    },
  });

  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe(
    'this is the title of the new blog'
  );
  expect(mockHandler.mock.calls[0][0].author).toBe('Jorge Medias');
  expect(mockHandler.mock.calls[0][0].url).toBe(
    'https://fullstackopen.com/en/part5/testing_react_apps#clicking-buttons-in-tests'
  );
});
