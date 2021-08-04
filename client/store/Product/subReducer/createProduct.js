import axios from 'axios';

// ACTION TYPE
const CREATE_PRODUCT = 'CREATE_PRODUCT';

// ACTION CREATOR
const createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

// THUNK CREATOR
export const createProduct = (product, history) => {
  return async dispatch => {
    const { data } = await axios.post('/api/product', product);
    dispatch(createProduct(data));
    // history.push('/product');
  };
};

// REDUCER
export default function createProductReducer(state = [], action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
