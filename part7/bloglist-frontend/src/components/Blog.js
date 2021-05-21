import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { deleteBlog, updateBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, loggedInUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isOwner = blog.user.username === loggedInUser.username;

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id));

        history.push('/');
      } catch (exception) {
        dispatch(setNotification(exception.response.data.error, 'error', 5));
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };

      dispatch(updateBlog(updatedBlog));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5));
    }
  };

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button className="like" type="button" onClick={handleUpdate}>
          like
        </button>
      </div>
      added by {blog.user.name}
      {isOwner ? (
        <button className="remove" type="button" onClick={handleRemove}>
          remove
        </button>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  loggedInUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Blog;
