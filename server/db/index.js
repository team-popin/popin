//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const ProductTimeSlot = require('./models/ProductTimeSlot')
const Category = require('./models/Category')
const Order = require('./models/Order')

// associations could go here!
User.hasMany(Product)
Product.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(ProductTimeSlot)
ProductTimeSlot.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

Order.hasMany(ProductTimeSlot)
ProductTimeSlot.belongsTo(Order)


module.exports = {
  db,
  models: {
    User,
    Product,
    ProductTimeSlot,
    Category,
    Order,
  },
}
