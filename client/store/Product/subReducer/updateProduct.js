import axios from 'axios';

// ACTION TYPE
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// ACTION CREATOR
const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

// THUNK CREATOR
export const updateProduct = (product, history) => {
  return async dispatch => {
    const { data } = await axios.post(`/api/product/${product.id}`, product);
    dispatch(updateProduct(data));
    // history.push('/product');
  };
};

// REDUCER
export default function updateProductReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_PRODUCT:
      return state.map(product =>
        product.id === action.product.id ? action.product : product
      );
    default:
      return state;
  }
}
