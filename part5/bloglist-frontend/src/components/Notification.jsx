import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color:
      notification.type === 'success' ? 'rgb(0, 128, 0)' : 'rgb(255, 0, 0)',
    background: 'lightgrey',
  };

  return <div style={style}>{notification.message}</div>;
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
