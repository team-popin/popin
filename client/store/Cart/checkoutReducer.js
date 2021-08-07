import axios from 'axios';

// action types
const CHECKOUT_CART = 'CHECKOUT_CART';

// action creators
const checkoutCart = order => ({
  type: CHECKOUT_CART,
  order,
});

// thunk creators

//In order to use the thunk, we must pass in the items stored in the redux store cart to enable functionality for non-logged-in users.
export const checkoutCartThunk = cart => {
  //if user is logged in, get their orderId

  return async dispatch => {
    const token = window.localStorage.getItem('token')
    //if a user is logged in

    if (token) {
      //then get user
      const { data: user } = await axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });

      //We know the user has an open order by this point, so we are going to change isPurchased to true!
      const { data: order } = await axios.put(
        `api/order/openOrder?userId=${user.id}`,
        { isPurchased: true }
      );
      console.log("THUNK RUNNING")
      // add the item to the redux store
      dispatch(checkoutCart(order));
    }

    //If a user is not logged in, lets create a new order for them now and associate the items in the redux store cart with the order
    else {
      const { data: order } = await axios.post('api/order');

      //Associate all of the productTimeSlots on the redux store cart with this order
      //First, we must flatten the cart object into an array containing just the productTimeSlots
      const productTimeSlots2DArray = Object.keys(cart).map(key => {
        //map function returns array cointain our values from the object (which are arrays themselves)

        return cart[key]; //an array of productTimeSlots
      });

      //This is a flattened array, containing the productTimeSlots (which are objects)
      const productTimeSlotsFlattened = [];

      for (let i = 0; i < productTimeSlots2DArray.length; i++) {
        productTimeSlotsFlattened.push(...productTimeSlots2DArray[i]);

        productTimeSlotsFlattened = [
          ...productTimeSlotsFlattened,
          ...productTimeSlots2DArray[i],
        ];
      }

      //Finally, on our flattened array, we associate each productTimeSlot with the orderId
      productTimeSlotsFlattened.map(async productTimeSlot => {
        const { data } = await axios.put(
          `/api/productTimeSlot/${productTimeSlot.id}`,
          { orderId: order.id }
        );
      });

      //Change isPurchased in the order to true
      const { data: updatedOrder } = await axios.put(`api/order/${order.id}`, {
        isPurchased: true,
      });

      dispatch(checkoutCart(updatedOrder));
    }
  };
};

// cartReducer
export default (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_CART:
      //The keys in state are productIds. The values are arrays containing productTimeSlots whos productId is the key!
      return action.order;
    default:
      return state;
  }
};
