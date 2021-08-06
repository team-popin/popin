import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// dummy data
const dummyCart = {
  1: [
    { dateTime: "2021-08-10 10:00"},
    { dateTime: "2021-08-10 10:30"  },
    { dateTime: "2021-08-10 11:00"},
    { dateTime: "2021-08-10 12:00"}
  ]
}

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // const sortedCart = cart.map((productTimeSlot) =>{for (let i=0; i< cart.length; i++){

  // }))//Return an array of arrays that contain productTimeSlots grouped by their ProductId

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

      {/* This is a good place to map over the items in the cart to display them*/}

      {/* {
        [1, 2, 3].map(num => {
          return (
            <p>{num}</p>
          )
        })
      } */}

      {/* {
        Object.keys(dummyCart).map(num => {
          return (
            <p>{num}</p>
          )
        })
      } */}

      {Object.keys(dummyCart).map((productId) => {
        const productTimeSlots = dummyCart[productId];
        // const {data: product} = await axios.get(`/product/:${productId}`)
        //get request to get the product description and title by using cartInstance key

      return (
        <div>
          {/* <h1>{product.name}</h1>
          <p>{product.description}</p> */}
          {productTimeSlots.map((productTimeSlot) => {
            return(
              <p>{productTimeSlot.dateTime}</p>
            )
          })}
        </div>
      )
      })}
    </div>
  )
}


