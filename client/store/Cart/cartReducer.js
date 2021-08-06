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

  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    //if a user is logged in
    if (token) {
      //then get user
      const { data: user } = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      // then check if any associated order exists. If exists, simply get the order from server.
      let { data: order } = await axios.get(
        `api/order/?userId=${user.id}&isPurchased=false`
      );
      // if no existing order, create a new order for the user
      if (!order) {
        const { data: newOrder } = await axios.post("api/order", {
          userId: user.id,
        });
        order = newOrder;
      }

      // then update the productTimeSlot with the orderId
      const { data } = await axios.put(
        `/api/productTimeSlot/${productTimeSlot.id}`,
        { orderId: order.id }
      );

      // add the item to the redux store
      dispatch(addToCart(data));
    }

    //if a user is not logged in, just add the item to the redux store (we'll create an order for non-logged-in users when they checkout):
    else {
      dispatch(addToCart(productTimeSlot));
    }
  };
};

// cartReducer
export default (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //The keys in state are productIds. The values are arrays containing productTimeSlots whos productId is the key!
      let newState = { ...state };
      newState[action.productTimeSlot.productId].push(action.productTimeSlot);
      return newState;
    default:
      return state;
  }
};
