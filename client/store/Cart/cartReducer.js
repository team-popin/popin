import axios from "axios";

// action types
const ADD_TO_CART = "ADD_TO_CART";

// action creators
const addToCart = (productTimeSlot) => ({
  type: ADD_TO_CART,
  productTimeSlot,
});

// thunk creators
export const putCart = (timeSlot) => {
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
      const { data: productTimeSlot } = await axios.put(
        `/api/productTimeSlot/${timeSlot.id}`,
        { orderId: order.id }
      );

      // add the item to the redux store
      let localCart = window.localStorage.getItem('cart');
      if (!localCart) {
        window.localStorage.setItem('cart', '{}');
        localCart = window.localStorage.getItem('cart');
      }
      const cart = JSON.parse(localCart);
      if (cart[productTimeSlot.productId])
      {
        cart[productTimeSlot.productId].push(productTimeSlot);
      }
      else {
        cart[productTimeSlot.productId] = [productTimeSlot];
      }
      window.localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(addToCart(productTimeSlot));
    }

    //if a user is not logged in, just add the item to the session storage/redux store (we'll create an order for non-logged-in users when they checkout):
    else {
      let localCart = window.localStorage.getItem('cart');
      if (!localCart) {
        window.localStorage.setItem('cart', '{}');
        localCart = window.localStorage.getItem('cart');
      }
      const cart = JSON.parse(localCart);
      if (cart[timeSlot.productId])
      {
        cart[timeSlot.productId].push(timeSlot);
      }
      else {
        cart[timeSlot.productId] = [timeSlot];
      }
      window.localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(addToCart(timeSlot));
    }
  };
};

// cartReducer
const initialCart = window.localStorage.getItem('cart') || '{}';
const initialState = JSON.parse(initialCart);

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //The keys in state are productIds. The values are arrays containing productTimeSlots whos productId is the key!
      const newCart = window.localStorage.getItem('cart') || '{}';
      const newState = JSON.parse(newCart);
      return newState;
    default:
      return state;
  }
};
