import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const byLikesDescending = (a, b) => b.likes - a.likes;
  const sortedBlogs = blogs.sort(byLikesDescending);

  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </li>
      ))}
    </ul>
  );
};

Blogs.propTypes = {
  loggedInUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blogs;
