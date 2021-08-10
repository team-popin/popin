import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/LogIn';
import { me } from './store';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct';
import SingleUser from './components/SingleUser'
import OrderSuccessful from './components/OrderSuccessful';
import SignUp from './components/SignUp';

/**
 * COMPONENT
 */
const FourOhFour = () => {
  return <h1>Why are you here?</h1>;
};

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
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/userprofile" component={SingleUser} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/product/:id" component={SingleProduct} />
            <Route exact path="/product" component={AllProducts} />
            <Route exact path="/ordersuccessful" component={OrderSuccessful} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={FourOhFour} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/userprofile" component={SingleUser} />
            <Route path="/product/:id" component={SingleProduct} />
            <Route exact path="/product" component={AllProducts} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/ordersuccessful" component={OrderSuccessful} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={FourOhFour} />
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
