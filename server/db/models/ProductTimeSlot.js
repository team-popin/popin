const Sequelize = require('sequelize');
const db = require('../db');

const ProductTimeSlot = db.define('productTimeSlot', {
  dateTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = ProductTimeSlot;
