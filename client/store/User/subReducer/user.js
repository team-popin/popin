import axios from "axios";
import history from "../../../history";

const TOKEN = "token";

// ACTION TYPES
const SET_AUTH = "SET_AUTH";
const CREATE_USER = "CREATE_USER";
const UPDATE_USER = "UPDATE_USER";

// ACTION CREATORS
const setAuth = (user) => ({ type: SET_AUTH, user });
const createUser = (user) => ({ type: CREATE_USER, user });
const updateUser = (user) => ({ type: UPDATE_USER, user });

// THUNK CREATORS
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push("/product");
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const createUserThunk = (user, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/user", user);
      dispatch(createUser(created));
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateUserThunk = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/user/:${user.id}`, user);
      dispatch(updateUser(data));
      history.push(`/user/:${user.id}`);
    } catch (e) {
      console.log(e);
    }
  };
};

// REDUCER
export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.user;
    case CREATE_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};
