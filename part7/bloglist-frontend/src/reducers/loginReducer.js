import storage from '../utils/storage';
import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return action.data;
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return action.data;
    default:
      return state;
  }
};

export const loadUser = () => async (dispatch) => {
  const data = storage.loadUser();

  dispatch({
    type: 'LOAD_USER',
    data,
  });
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const data = await loginService.login({ username, password });
    storage.saveUser(data);

    dispatch({
      type: 'SET_USER',
      data,
    });
  } catch (exception) {
    dispatch(setNotification('wrong username or password', 'error', 5));
  }
};

export const logoutUser = () => async (dispatch) => {
  storage.logoutUser();

  dispatch({
    type: 'CLEAR_USER',
    data: null,
  });
};

export default loginReducer;
