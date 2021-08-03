const Sequelize = require('sequelize');
const db = require('../db');

const ProductTimeSlot = db.define('productTimeSlot', {
  dateTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  IsInCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  IsPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = ProductTimeSlot;
