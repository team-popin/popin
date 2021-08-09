import axios from 'axios';

// ACTION TYPE
const GET_PRODUCT = 'GET_PRODUCT';

// ACTION CREATOR
const getProduct = product => ({ type: GET_PRODUCT, product });

// THUNK CREATOR
export const fetchProduct = id => {
  return async dispatch => {
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch(getProduct(data));
  };
};

// REDUCER
export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
