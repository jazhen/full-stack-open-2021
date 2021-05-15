import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

Notification.defaultProps = {
  notification: null,
};

export default Notification;
