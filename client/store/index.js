import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './User/user';
import products from './Product/allProducts';
import product from './Product/singleProduct';
import selectedTimeSlots from './Product/timeSlots';
import cart from './Cart/cartReducer';
import categories from './Product/category'

const reducer = combineReducers({
  products,
  product,
  user,
  cart,
  selectedTimeSlots,
  categories
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './User/user';
