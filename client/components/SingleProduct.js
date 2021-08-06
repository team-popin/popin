import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
// import { Link } from 'react-router-dom';
import { fetchProduct } from "../store/Product/subReducer/singleProduct";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    width: "80vw",
    // display: "flex",
    flexWrap: "wrap",
    //flexDirection: "row",
    margin: "5% 10% 3% 10%",
  },
  card1: {
    height: "100%",
    width: "80vw",
    margin: "0% 10% 3% 10%",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SingleProduct = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch]);

  const classes = useStyles();

  console.log(product);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {product.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={product.imageUrl}
            title="Image title"
          />
          <CardContent>
            <Typography>{product.name}</Typography>
            <Typography>{product.price} $</Typography>
            {product.user ? (
              <Typography>
                {product.user.firstName} {product.user.lastName}
              </Typography>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
        <Card className={classes.card1}>
          <CardContent>
            <Typography>{product.description}</Typography>
          </CardContent>
        </Card>
        <Card className={classes.card1}>
        <CardContent>
            <Typography>Time slots</Typography>
        </CardContent>
        </Card>
      </main>
    </React.Fragment>
  );
};

export default SingleProduct;
