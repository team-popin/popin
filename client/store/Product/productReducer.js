import {combineReducers} from 'redux';
import createProductReducer  from './subReducer/createProduct';
import deleteProductReducer from './subReducer/deleteProduct'
import singleProductReducer from './subReducer/getSingleProduct'
import updateProductReducer from './subReducer/updateProduct';
import getAllProductsReducer from './subReducer/getAllProducts'

export default combineReducers({ 
  createProductReducer, 
  deleteProductReducer, 
  singleProductReducer, 
  updateProductReducer,
  getAllProductsReducer,
});