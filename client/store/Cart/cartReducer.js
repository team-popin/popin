import axios from "axios";

// action types
const ADD_TO_CART = "ADD_TO_CART";

// action creators
const addToCart = (productTimeSlot) => ({
  type: ADD_TO_CART,
  productTimeSlot,
});

// thunk creators
export const putCart = async (productTimeSlot) => {
  //if user is logged in, get their orderId

  //if a user is logged in
  const token = window.localStorage.getItem('token');
  if (token) {
    //then get user
    const { data: user } = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });

    let { data: order } = await axios.get(
      `api/order/${user.id}?userId=${user.id}&isPurchased=false`
    );

    if (!order) {
      const { data: newOrder } = await axios.post('api/order', {userId: user.id});
      order = newOrder;
    }

    return async (dispatch) => {
      productTimeSlot.orderId = order.id;

      const { data } = await axios.put(
        `/api/productTimeSlot/${productTimeSlot.id}`,
        { orderId: order.id }
      );

      dispatch(addToCart(data));

      // history.push('/product');
    };
  }

  //if a user is not logged in:





};
// cartReducer
