import React from 'react';
import { useDispatch } from 'react-redux';
import useField from '../hooks/useFields';

import { loginUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser(username.fields.value, password.fields.value));
    username.reset();
    password.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          username
        </label>
        <input id="username" placeholder="username" {...username.fields} />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          password
        </label>
        <input id="password" placeholder="************" {...password.fields} />
      </div>
      <button
        type="submit"
        className="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        focus:outline-none
        focus:shadow-outline
      "
      >
        log in
      </button>
    </form>
  );
};

export default LoginForm;
