import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ loggedInUser, blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
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
            <button
              className="like"
              type="button"
              onClick={() => updateBlog(blog)}
            >
              like
            </button>
          </div>
          {loggedInUser.username === blog.user.username ? (
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
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
