import axios from 'axios';
import history from '../../../history';

const TOKEN = 'token';

// ACTION TYPES
const SET_AUTH = 'SET_AUTH';

// ACTION CREATORS
const setAuth = user => ({ type: SET_AUTH, user });

// THUNK CREATORS
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push('/product');
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

// REDUCER
export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.user;
    default:
      return state;
  }
};
