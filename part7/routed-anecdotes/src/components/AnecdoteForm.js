import React, { useState } from 'react';
import { useHistory } from 'react-router';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    fields: {
      type,
      value,
      onChange,
    },
    reset,
  };
};

const AnecdoteForm = ({ addNew, notify }) => {
  const history = useHistory();

  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.fields.value,
      author: author.fields.value,
      info: info.fields.value,
      votes: 0,
    });

    notify(`a new anecdote ${content.fields.value} created!`);

    history.push('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fields} />
        </div>
        <div>
          author
          <input {...author.fields} />
        </div>
        <div>
          url for more info
          <input {...info.fields} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
