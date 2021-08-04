const Sequelize = require('sequelize');
const db = require('../db');

const ProductTimeSlot = db.define('productTimeSlot', {
  dateTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// add hook for price at the time it was purchased

module.exports = ProductTimeSlot;
