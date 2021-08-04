const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    // decimals: 2, //I think this may work, but it's possibly incorrect https://sequelize.org/master/class/lib/data-types.js~FLOAT.html
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/200',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'No description provided.',
  },
  /* slots: {
    ?
  } */
});

module.exports = Product;


