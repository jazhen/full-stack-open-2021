import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logoutUser } from '../reducers/loginReducer';

const Menu = ({ user }) => {
  const dispatch = useDispatch();

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} logged in
      <button type="button" onClick={() => dispatch(logoutUser())}>
        logout
      </button>
    </div>
  );
};

Menu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Menu;
