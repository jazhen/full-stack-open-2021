import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addBlog = async (event) => {
    event.preventDefault();

    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  const handleChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input name="title" value={newBlog.title} onChange={handleChange} />
        </div>
        <div>
          author:
          <input name="author" value={newBlog.author} onChange={handleChange} />
        </div>
        <div>
          url:
          <input name="url" value={newBlog.url} onChange={handleChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
