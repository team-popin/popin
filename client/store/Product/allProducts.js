import axios from 'axios';
import history from '../../history';
import { addTimeSlotForProduct } from './timeSlots';

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products,
});

const createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

// THUNK CREATORS
export const fetchProducts = () => {
  return async dispatch => {
    const { data } = await axios.get(`/api/product`);
    dispatch(getProducts(data));
  };
};

export const postProduct = (product, timeSlotDate) => {
  
  return async dispatch => {
    const token = window.localStorage.getItem('token');
    const authHeader = {
      headers: {
        authorization: token
      }
    }
    
    const { data: newProduct } = await axios.post('/api/product', product, authHeader);
    dispatch(createProduct(newProduct));
    dispatch(addTimeSlotForProduct(timeSlotDate, newProduct.id));
    // history.push('/product');
  };
};

export const putProduct = (product, history) => {
  return async dispatch => {
    const { data } = await axios.post(`/api/product/${product.id}`, product);
    dispatch(updateProduct(data));
    // history.push('/product');
  };
};

export const deleteProductThunk = (id, history) => {
  return async dispatch => {
    const { data } = await axios.delete(`/api/product/${id}`);
    dispatch(deleteProduct(data));
    history.push('/product');
  };
};

// REDUCERS
export default function getAllProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map(product =>
        product.id === action.product.id ? action.product : product
      );
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id);
    default:
      return state;
  }
}
