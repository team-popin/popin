import axios from 'axios';

// ACTION TYPE
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// ACTION CREATOR
const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

// THUNK CREATOR
export const deleteProduct = (id, history) => {
  return async dispatch => {
    const { data } = await axios.delete(`/api/product/${id}`);
    dispatch(deleteProduct(data));
    // history.push('/product');
  };
};

// REDUCER
export default function deleteProductReducer(state = [], action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id);
    default:
      return state;
  }
}
