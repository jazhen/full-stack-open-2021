const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeoutID = null;

export const setNotification = (notification, clearTimeInSeconds) => {
  return async (dispatch) => {
    clearTimeout(timeoutID);

    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, clearTimeInSeconds * 1000);
  };
};

export default notificationReducer;
