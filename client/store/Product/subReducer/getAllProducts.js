import axios from 'axios';

// ACTION TYPE
const GET_PRODUCTS = 'GET_PRODUCTS';

// ACTION CREATOR
const getProducts = products => ({ type: GET_PRODUCTS, products });

// THUNK CREATOR
export const fetchProducts = () => {
  return async dispatch => {
    const { data } = await axios.get(`/api/product`);
    dispatch(getProducts(data));
  };
};

// REDUCER
export default function getAllProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
