import React from 'react';
import PropTypes from 'prop-types';
import useField from '../hooks/useFields';

const BlogForm = ({ createBlog }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = async (event) => {
    event.preventDefault();

    createBlog({
      title: title.fields.value,
      author: author.fields.value,
      url: url.fields.value,
    });

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title.fields} />
        </div>
        <div>
          author:
          <input {...author.fields} />
        </div>
        <div>
          url:
          <input {...url.fields} />
        </div>
        <button id="create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
