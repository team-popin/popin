import React from "react";
import { useSelector, useDispatch, useEffect } from "react-redux";
import axios from "axios";
import { checkoutCartThunk } from "../store/Cart/checkoutReducer";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
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
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  let history = useHistory()

  return (
    <div>
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

      return (

        <div key={productId}>{console.log(productTimeSlots)}
          {/* <h1>{productTimeSlots[0].product.name}</h1>
          <p>{productTimeSlots[0].product.description}</p> */}
          <Button onClick={()=>history.push(`/product/${productTimeSlots[0].product.id}`)}>Add More Time Slots</Button>
          {productTimeSlots.map((productTimeSlot) => {
            return(
              <div key={productTimeSlot.id}>
              <p>{productTimeSlot.dateTime.slice(0,10)} {productTimeSlot.dateTime.slice(11,16)}</p>
              <Button  onClick={()=>dispatch(removeItemFromCart(productTimeSlot))}>Remove</Button>
              </div>
            )
          })}
        </div>
      )
      })}

      <Button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={() => {
          // checkoutCartThunk(cart);
          dispatch(checkoutCartThunk(cart))
          // console.log("onclick is running whooo!!!")
          // console.log("THIS IS THE CART", cart)
          history.push('/ordersuccessful')
        }}
      >
        Checkout Cart
      </Button>
    </div>
  );
}
// button onclick handler --> call checkoutCartThunk(cart) <-- these are the productTimeSlots getting passed to the checkoutCartThunk
