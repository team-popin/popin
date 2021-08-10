import axios from "axios";

// action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const REFRESH_CART_ON_LOGIN = "REFRESH_CART_ON_LOGIN";
const CLEAR_CART_ON_CHECKOUT = "CLEAR_CART_ON_CHECKOUT";

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
  cartObject,
});

const clearCart = () => ({
  type: CLEAR_CART_ON_CHECKOUT,
});


// thunk creators
export const putCart = (timeSlot) => {
  //if user is logged in, get their orderId
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const authHeader = {
      headers: {
        authorization: token
      }
    };

    //if a user is logged in
    if (token) {
      //then get user
      const { data: user } = await axios.get("/auth/me", authHeader);

      // then check if any associated order exists. If exists, simply get the order from server.
      let { data: order } = await axios.get(`/api/order/openOrder`, authHeader);

      // if no existing order, create a new order for the user
      if (!order) {
        const { data: newOrder } = await axios.post("/api/order", {
          userId: user.id,
          isPurchased: false,
        });
        order = newOrder;
      }

      // then update the productTimeSlot with the orderId
      const { data: productTimeSlot } = await axios.put(
        `/api/productTimeSlot/${timeSlot.id}`,
        { orderId: order.id }
      );

      timeSlot = productTimeSlot;
    }

    //if a user is not logged in, just add the item to the session storage/redux store (we'll create an order for non-logged-in users when they checkout):

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
  };
};

export const removeItemFromCart = (timeSlot) => {
  return async (dispatch) => {
    // const { data } = await axios.get(`/api/productTimeSlot/${timeSlot.id}`);

    const token = window.localStorage.getItem("token");

    // if a user is logged in
    // const token = window.localStorage.getItem("token");
    if (token) {
      // Remove order association from productTimeSlot
      await axios.put(`/api/productTimeSlot/${timeSlot.id}`, { orderId: null });
    }
    dispatch(removeFromCart(timeSlot));
  };
};

export const cartOnLogin = () => {


  return async (dispatch) => {
    //Check if the user has an open order using user object from token & create an order for user, if it doesn't exist

    const token = window.localStorage.getItem("token");
    const authHeader = {
      headers: {
        authorization: token
      }
    };
    //if a user is logged in
    if (token) {
      //then get user
      const { data: user } = await axios.get("/auth/me", authHeader);

      // then check if any associated order exists. If exists, simply get the order from server.
      let { data: order } = await axios.get(
        `/api/order/openOrder`, authHeader);

      // if no existing order, create a new order for the user
      if (!order) {
        const { data: newOrder } = await axios.post("/api/order", {
          userId: user.id,
          isPurchased: false,
        });
        order = newOrder;
      }

      //Find all items that are associated with the open order, and store them for now

      const { data: itemsOnOrderBeforeLogin } = await axios.get(
        `/api/productTimeSlot/order/${order.id}`
      );

      //Find the items that are currently on the cart object prior to the user logging in

      let localCartBeforeLogin = JSON.parse(
        window.localStorage.getItem("cart")
      );

      if (!localCartBeforeLogin) {
        window.localStorage.setItem("cart", "{}");
        localCartBeforeLogin = JSON.parse(window.localStorage.getItem("cart"));
      }

      //Add prior-to-logged-in cart items to the openOrder and put them back onto the cart with their order association

      let newCartObject = {};

      const assignOrderIdToTimeSlot = async (productTimeSlot, theOrder) => {
        const res = await axios.put(
          `/api/productTimeSlot/${productTimeSlot.id}`,
          {
            orderId: theOrder.id,
          }
        );
        return res;
      };

      if (Object.keys(localCartBeforeLogin).length > 0) {
        Object.keys(localCartBeforeLogin).map((cartKey) => {
          newCartObject[cartKey] = localCartBeforeLogin[cartKey].map(
            (productTimeSlot) => {
              assignOrderIdToTimeSlot(productTimeSlot, order);

              //just manually change the order on object and return that!
              productTimeSlot.orderId = order.id;
              return productTimeSlot;
            }
          );
        });
      };

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

      itemsOnOrderBeforeLogin.map((productTimeSlot) => {
        if (!combinedOrder[productTimeSlot.product.id]) {
          combinedOrder[productTimeSlot.product.id] = [];
        }
        combinedOrder[productTimeSlot.product.id] = [
          ...combinedOrder[productTimeSlot.product.id],
          productTimeSlot,
        ];
      });

      window.localStorage.setItem("cart", JSON.stringify(combinedOrder));
      dispatch(refreshCartOnLogin(combinedOrder));
    }
  };
};

export const clearCartThunk = () => {
  return async (dispatch) => {
    window.localStorage.setItem("cart", "{}");
    dispatch(clearCart());
  };
};

// cartReducer
const initialCart = window.localStorage.getItem("cart") || "{}";
const initialState = JSON.parse(initialCart);

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //The keys in state are productIds. The values are arrays containing productTimeSlots whos productId is the key!
      const newCart = window.localStorage.getItem("cart") || "{}";
      const newState = JSON.parse(newCart);
      return newState;

    case REMOVE_FROM_CART:
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

      window.localStorage.setItem("cart", JSON.stringify(newCartObject));
      return newCartObject;

    case REFRESH_CART_ON_LOGIN:
      return action.cartObject;

    case CLEAR_CART_ON_CHECKOUT:
      return {};

    default:
      return state;
  }
};
