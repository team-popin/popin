import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { ButtonBase } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import VpnKeySharpIcon from "@material-ui/icons/VpnKeySharp";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  cart: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  shoppingCartIconDiv: {
    position: 'relative',
  },
  shoppingCartIcon: {
    cursor: 'pointer',
  },
  logInOut: {
    marginLeft: "25px",
    cursor: "pointer",
  },
  shoppingCartItemNum: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'red',
    color: 'white',
    position: 'absolute',
    top: '-40%',
    right: '-40%',
    textAlign: 'center',
  },
  Icons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => !!state.user.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const getCartSize = () => {
    return Object.values(cart).reduce((acc, value) => {
      return acc + value.length;
    }, 0);
  };

  return (
    <AppBar position="relative">
      <Toolbar className={classes.cart}>
        <ButtonBase onClick={() => history.push('/product')}>
          <Typography variant="h6" color="inherit" noWrap>
            Pop In!
          </Typography>
        </ButtonBase>
        <Grid className={classes.Icons}>
          <div className={classes.shoppingCartIconDiv}>
            <ShoppingCartIcon
              className={classes.shoppingCartIcon}
              onClick={() => history.push('/cart')}
            />

            <div className={classes.shoppingCartItemNum}>{getCartSize()}</div>
          </div>
          {isLoggedIn ? (
            <ExitToAppSharpIcon
              className={classes.logInOut}
              onClick={() => {
                dispatch(logout());
              }}
            />
          ) : (
            <VpnKeySharpIcon
              className={classes.logInOut}
              onClick={() => history.push('/login')}
            />
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
