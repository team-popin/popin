import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/Product/subReducer/getAllProducts';

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
      </div>
    );
  }
}
const mapState = ({ products }) => ({
  products,
});
const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
