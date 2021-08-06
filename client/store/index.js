import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './User/subReducer/user';
// import products from './Product/productReducer';
import products from './Product/subReducer/allProducts';
import product from './Product/subReducer/singleProduct';
import timeSlots from './Product/subReducer/timeSlots';
import cart from './Cart/cartReducer';

const reducer = combineReducers({
  products,
  product,
  user,
  cart,
  timeSlots,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './User/subReducer/user';
