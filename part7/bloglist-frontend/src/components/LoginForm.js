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
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input id="username" {...username.fields} />
      </div>
      <div>
        password
        <input id="password" {...password.fields} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
