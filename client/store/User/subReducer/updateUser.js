import axios from 'axios';

const UPDATE_USER = 'UPDATE_USER';

const updateUser = user => ({ type: UPDATE_USER, user });

export const updateUserThunk = (user, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/user/:${user.id}`, user);
      dispatch(updateUser(user));
      history.push(`/user/:${user.id}`);
    } catch (e) {
      console.log(e);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return state.filter(user => user.id !== action.user.id);
    default:
      return state;
  }
};
