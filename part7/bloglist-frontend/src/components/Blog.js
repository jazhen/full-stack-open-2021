import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, isOwner }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id));
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button className="view" type="button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible ? (
        <>
          <div>{blog.url}</div>
          <div>
            likes <span className="likes-count">{blog.likes}</span>
            <button className="like" type="button" onClick={handleUpdate}>
              like
            </button>
          </div>
          {isOwner ? (
            <button className="remove" type="button" onClick={handleRemove}>
              remove
            </button>
          ) : null}
        </>
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
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Blog;
