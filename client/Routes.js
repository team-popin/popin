import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/LogIn'
import { me } from './store';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct';
import OrderSuccessful from './components/OrderSuccessful';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
          <Route path="/" exact component={AllProducts} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:id" component={SingleProduct} />
          <Route path="/product" component={AllProducts} />
          <Route path="/ordersuccessful" component={OrderSuccessful} />
        </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/product/:id" component={SingleProduct} />
            <Route path="/product" component={AllProducts} />
            <Route path="/cart" component={Cart} />
            <Route path="/ordersuccessful" component={OrderSuccessful} />

          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
