import axios from 'axios';

const CREATE_USER = 'CREATE_USER';

const createUser = user => ({ type: CREATE_USER, user });

export const createUserThunk = (user, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/user', user);
      dispatch(createUser(user));
      history.push("/login")
    } catch (e) {
      console.log(e);
    }
  };
};

export default createUserReducer = (state={}, action)=>{
switch (action.type){
  case CREATE_USER: 
  return [...state, action.user]
default: 
return state;
}
}