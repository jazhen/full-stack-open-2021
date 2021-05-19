import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';

describe('when viewing a single blog', () => {
  let component = null;
  const mockHandler = jest.fn();

  beforeEach(async () => {
    const blog = {
      title: 'Great developer experience',
      author: 'Hector Ramos',
      url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
      likes: 7,
      id: '609b1d03119c822cc99c6cd3',
      user: {
        username: 'userman',
      },
    };

    const loggedInUser = {
      username: 'userman',
    };

    component = render(
      <Blog
        loggedInUser={loggedInUser}
        blog={blog}
        updateBlog={mockHandler}
        removeBlog={mockHandler}
      />
    );
  });

  test('only renders title and author by default', () => {
    expect(component.container).toHaveTextContent('Great developer experience');
    expect(component.container).toHaveTextContent('Hector Ramos');
    expect(component.container).not.toHaveTextContent(
      'https://jestjs.io/blog/2017/01/30/a-great-developer-experience'
    );
    expect(component.container).not.toHaveTextContent('7');
  });

  test('renders url and likes after clicking the view button', () => {
    const viewBlogButton = component.getByText('view');

    fireEvent.click(viewBlogButton);

    expect(component.container).toHaveTextContent(
      'https://jestjs.io/blog/2017/01/30/a-great-developer-experience'
    );
    expect(component.container).toHaveTextContent('7');
  });

  test('clicking the like button calls the event handler twice', () => {
    const viewBlogButton = component.getByText('view');

    fireEvent.click(viewBlogButton);

    const likeButton = component.getByText('like');

    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(1);

    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
