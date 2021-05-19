const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.message, type: action.category };
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const setNotification =
  (message, category, clearTimeInSeconds) => async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      category,
    });

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, clearTimeInSeconds * 1000);
  };
export default notificationReducer;
