import {combineReducers} from 'redux';
import updateUserReducer  from './subReducer/updateUser';
import createUserReducer from './subReducer/createUser'
import setAuthReducer from './subReducer/user'

export default combineReducers({ 
  createUserReducer, 
  updateUserReducer, 
  setAuthReducer 
});