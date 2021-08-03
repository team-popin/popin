//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Category = require('./models/Category')
const Cart = require('./models/Cart')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Category,
    Cart
  },
}
