import axios from "axios";

// action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const REFRESH_CART_ON_LOGIN = "REFRESH_CART_ON_LOGIN"

// action creators
const addToCart = (productTimeSlot) => ({
  type: ADD_TO_CART,
  productTimeSlot,
});

const removeFromCart = (productTimeSlot) => ({
  type: REMOVE_FROM_CART,
  productTimeSlot,
});

const refreshCartOnLogin = (cartObject) => ({
  type: REFRESH_CART_ON_LOGIN,
  cartObject
})

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

      console.log(user);
      // then check if any associated order exists. If exists, simply get the order from server.
      let { data: order } = await axios.get(
        `/api/order/openOrder?userId=${user.id}`
      );

      console.log("Order", order);

      // if no existing order, create a new order for the user
      if (!order) {
        console.log("USER DOES NOT HAVE AN OPEN ORDER. MAKING ORDER NOW");
        console.log(user.id);
        const { data: newOrder } = await axios.post("/api/order", {
          userId: user.id,
          isPurchased: false,
        });
        // console.log(data)
        order = newOrder;
      }
      console.log("ORDER>>>>>>", order);

      // then update the productTimeSlot with the orderId
      const { data: productTimeSlot } = await axios.put(
        `/api/productTimeSlot/${timeSlot.id}`,
        { orderId: order.id }
      );
      console.log(productTimeSlot);
      // add the item to the redux store
      let localCart = window.localStorage.getItem("cart");
      if (!localCart) {
        window.localStorage.setItem("cart", "{}");
        localCart = window.localStorage.getItem("cart");
      }
      const cart = JSON.parse(localCart);
      if (cart[productTimeSlot.productId]) {
        cart[productTimeSlot.productId].push(productTimeSlot);
      } else {
        cart[productTimeSlot.productId] = [productTimeSlot];
      }
      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCart(productTimeSlot));
    }

    //if a user is not logged in, just add the item to the session storage/redux store (we'll create an order for non-logged-in users when they checkout):
    else {
      let localCart = window.localStorage.getItem("cart");
      if (!localCart) {
        window.localStorage.setItem("cart", "{}");
        localCart = window.localStorage.getItem("cart");
      }
      const cart = JSON.parse(localCart);
      if (cart[timeSlot.productId]) {
        cart[timeSlot.productId].push(timeSlot);
      } else {
        cart[timeSlot.productId] = [timeSlot];
      }
      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCart(timeSlot));
    }
  };
};

export const removeItemFromCart = (timeSlot) => {
  console.log("THUNK IS RUNNING");
  // console.log(timeSlot)

  return async (dispatch) => {
    const { data } = await axios.get(`/api/productTimeSlot/${timeSlot.id}`);
    // const { data } = await axios.put(`/api/productTimeSlot/${timeSlot.id}`, {
    //   orderId: null,
    // });

    // if a user is logged in
    const token = window.localStorage.getItem("token");
    if (token) {
      // Get user
      // const { data: user } = await axios.get("/auth/me", {
      //   headers: {
      //     authorization: token,
      //   },
      // });

      // // Find their open order
      // let { data: order } = await axios.get(
      //   `/api/order/openOrder?userId=${user.id}`
      // );

      // Remove order association from productTimeSlot
      const { data: productTimeSlot } = await axios.put(
        `/api/productTimeSlot/${timeSlot.id}`,
        { orderId: null }
      );
    }
    console.log(data);
    dispatch(removeFromCart(timeSlot));
  };
};
// cartReducer
const initialCart = window.localStorage.getItem("cart") || "{}";
const initialState = JSON.parse(initialCart);

export const cartOnLogin = () => {
  return async (dispatch) => {
    //Check if the user has an open order using user object from token
    //Create an order for user, if it doesn't exist

    const token = window.localStorage.getItem("token");
    //if a user is logged in
    if (token) {
      //then get user
      const { data: user } = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });

      console.log("GOT THE USER>>>>", user);
      // then check if any associated order exists. If exists, simply get the order from server.
      let { data: order } = await axios.get(
        `/api/order/openOrder?userId=${user.id}`
      );

      console.log("GOT AN EXISTING OPEN ORDER>>>>", order);

      // if no existing order, create a new order for the user
      if (!order) {
        console.log("USER DOES NOT HAVE AN OPEN ORDER. MAKING ORDER NOW");
        console.log(user.id);
        const { data: newOrder } = await axios.post("/api/order", {
          userId: user.id,
          isPurchased: false,
        });
        // console.log(data)
        order = newOrder;
      }
      console.log("ORDER>>>>>>", order);

      //Find all items that are associated with the open order, and store them for now

      const itemsOnOrderBeforeLogin = await axios.get(
        `/api/productTimeSlot/${order.id}`
      );

      //Find the items that are currently on the cart object prior to the user logging in

      let localCartBeforeLogin = window.localStorage.getItem("cart");

      //Add prior-to-logged-in cart items to the openOrder and put them back onto the cart with their order association

      let newCartObject = {};

      Object.keys(localCartBeforeLogin).map((cartKey) => {
        newCartObject[cartKey] = localCartBeforeLogin[cartKey].map(
          async (productTimeSlot) => {
            return await axios.put(`productTimeSlot/${productTimeSlot.id}`, {
              orderId: order.id,
            });
          }
        );
      });
      //Combine old and new into one object

      let combinedOrder = {};

      Object.keys(newCartObject).map((cartKey) => {
        if (!combinedOrder[cartKey]) {
          combinedOrder[cartKey] = [];
        }
        combinedOrder[cartKey] = [
          ...combinedOrder[cartKey],
          ...newCartObject[cartKey],
        ];
      });

      Object.keys(itemsOnOrderBeforeLogin).map((cartKey) => {
        if (!combinedOrder[cartKey]) {
          combinedOrder[cartKey] = [];
        }
        combinedOrder[cartKey] = [
          ...combinedOrder[cartKey],
          ...itemsOnOrderBeforeLogin[cartKey],
        ];
      });

      window.localStorage.setItem("cart", combinedOrder)
      dispatch(refreshCartOnLogin(combinedOrder))
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //The keys in state are productIds. The values are arrays containing productTimeSlots whos productId is the key!
      const newCart = window.localStorage.getItem("cart") || "{}";
      const newState = JSON.parse(newCart);
      return newState;

    case REMOVE_FROM_CART:
      // console.log("REDUCER RUNNING")
      let cart = JSON.parse(window.localStorage.getItem("cart"));
      let newCartObject = {};
      // eslint-disable-next-line no-case-declarations
      Object.keys(cart).map((cartKey) => {
        const filteredProductTimeSlots = cart[cartKey].filter((item) => {
          if (item.id !== action.productTimeSlot.id) {
            return item;
          }
        });
        newCartObject[cartKey] = filteredProductTimeSlots;
      });

      //

      window.localStorage.setItem("cart", JSON.stringify(newCartObject));
      return newCartObject;

    case REFRESH_CART_ON_LOGIN:
      return action.cartObject

    default:
      return state;
  }
};
