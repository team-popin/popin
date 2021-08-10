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
import Card from "@material-ui/core/Card";
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
const useStyles = makeStyles((theme) => ({
  cartT: {
    width: "98vw"
  },
  cartTP: {
    margin: "1% 5% 1% 5%",
  },
  cartProduct: {
    margin: "1% 1% 2% 1%",
  },
  cartDate: {
    margin: "1% 1% 1% 1%",
    padding: "10px",
    width: "290px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f5f3f4",
  },
  mainCl: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}));
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.mainCl}>
        <Grid>
          <Card className={classes.cartT}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Your Cart
            </Typography>
          </Card>
        </Grid>
        <Grid>
          <Card className={classes.cartTP}>
            {Object.keys(cart).map((productId) => {
              const productTimeSlots = cart[productId];
              //If the productTimeSlots array has product time slots in it (this is important because when a user removes all of the items of a certain product from their cart, they are left with the key-value pair for that product in their car, but the value (array) is empty and will break the page without this condition.)
              if (productTimeSlots[0]) {
                return (
                  <Grid key={productId} >
                    <Card
                      className={classes.cartProduct}
                      style={{ backgroundColor: "#d3d3d3" }}
                    >
                      <Grid style={{display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                      <Typography style={{padding: "10px", fontSize: "30px", marginLeft: "10px", color: "#323031"}}>{productTimeSlots[0].product.name}</Typography>
                        <Button
                        variant="contained"
                        color="primary"
                        style={{
                          width: "230px",
                          height: "25px",
                          borderRadius: "10px",
                          marginLeft: "20px",
                          marginTop: "20px"
                        }} 
                          onClick={() =>
                            history.push(
                              `/product/${productTimeSlots[0].product.id}`
                            )
                          }
                        >
                          Add More Time Slots
                        </Button>
                      </Grid>
                      <Typography style={{ fontSize: "20px", paddingLeft: "25px", color: "#3d3b3c"}}>{productTimeSlots[0].product.description}</Typography>
                      <Grid>
                        <Card className={classes.cartT}>
                          {productTimeSlots.map((productTimeSlot) => {
                            return (
                              <Grid
                                key={productTimeSlot.id}
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                              >
                                <Card className={classes.cartDate}>
                                <Typography style={{ fontSize: "20px" }}>
                                  {productTimeSlot.dateTime.slice(0, 10)}{" "}
                                  {productTimeSlot.dateTime.slice(11, 16)}
                                </Typography>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{
                                    width: "80px",
                                    height: "25px",
                                    borderRadius: "10px",
                                    marginLeft: "20px",
                                  }}
                                  onClick={() =>
                                    dispatch(
                                      removeItemFromCart(productTimeSlot)
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Card>
                      </Grid>
                    </Card>
                  </Grid>
                );
              }
            })}
          </Card>
        </Grid>
        <Button
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "20px",
            alignItems: "center",
            margin: "10px 10px 50px 10px", 
            width: "200px",
            
          }}
          onClick={() => {
            dispatch(checkoutCartThunk(cart));
            history.push("/ordersuccessful");
          }}
        >
          Checkout Cart
        </Button>
      </main>
    </React.Fragment>
  );
}
