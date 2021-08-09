import React from "react";
import { useSelector, useDispatch, useEffect } from "react-redux";
import axios from "axios";
import { checkoutCartThunk } from "../store/Cart/checkoutReducer";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { removeItemFromCart } from "../store/Cart/cartReducer";

// dummy data
const dummyCart = {
  1: [
    {
      id: 1,
      dateTime: "2021-08-10 10:00",
      product: {
        name: "blah",
        description: "blahblajfieowja fjeioa fo jife joiwe jf",
      },
    },
    {
      id: 2,
      dateTime: "2021-08-10 10:30",
      product: {
        name: "blah",
        description: "blahblajfieowja fjeioa fo jife joiwe jf",
      },
    },
    {
      id: 3,
      dateTime: "2021-08-10 11:00",
      product: {
        name: "blah",
        description: "blahblajfieowja fjeioa fo jife joiwe jf",
      },
    },
    {
      id: 4,
      dateTime: "2021-08-10 12:00",
      product: {
        name: "blah",
        description: "blahblajfieowja fjeioa fo jife joiwe jf",
      },
    },
  ],
  7: [
    {
      id: 5,
      dateTime: "2021-08-10 11:00",
      product: {
        name: "blah",
        description: "blahblajfieowja fjeioa fo jife joiwe jf",
      },
    },
    {
      id: 6,
      dateTime: "2021-08-10 12:00",
      product: {
        name: "blah",
        description: "blahblajfieowja fjeioa fo jife joiwe jf",
      },
    },
  ],
};

export default function Cart() {
  // const cart = dummyCart
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Your Cart
        </Typography>
        {console.log("CART STATE", cart)}
        {Object.keys(cart).map((productId) => {
          const productTimeSlots = cart[productId];

          //If the productTimeSlots array has product time slots in it (this is important because when a user removes all of the items of a certain product from their cart, they are left with the key-value pair for that product in their car, but the value (array) is empty and will break the page without this condition.)
          if (productTimeSlots[0]) {
            return (
              <div key={productId}>
                {console.log(productTimeSlots)}
                <Grid display="flex" flexDirection="row">
                  <h1>{productTimeSlots[0].product.name}</h1>
                  <Button
                    onClick={() =>
                      history.push(`/product/${productTimeSlots[0].product.id}`)
                    }
                  >
                    Add More Time Slots
                  </Button>
                </Grid>
                <p>{productTimeSlots[0].product.description}</p>

                {productTimeSlots.map((productTimeSlot) => {
                  return (
                    <Grid
                      key={productTimeSlot.id}
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography>
                        {productTimeSlot.dateTime.slice(0, 10)}{" "}
                        {productTimeSlot.dateTime.slice(11, 16)}
                      </Typography>
                      <Button
                        onClick={() =>
                          dispatch(removeItemFromCart(productTimeSlot))
                        }
                      >
                        Remove
                      </Button>
                    </Grid>
                  );
                })}
              </div>
            );
          }
        })}

        <Button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={() => {
            // checkoutCartThunk(cart);
            dispatch(checkoutCartThunk(cart));
            // console.log("onclick is running whooo!!!")
            // console.log("THIS IS THE CART", cart)
            history.push("/ordersuccessful");
          }}
        >
          Checkout Cart
        </Button>
      </main>
    </React.Fragment>
  );
}
// button onclick handler --> call checkoutCartThunk(cart) <-- these are the productTimeSlots getting passed to the checkoutCartThunk
